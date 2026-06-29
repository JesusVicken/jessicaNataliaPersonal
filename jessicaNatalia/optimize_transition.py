import os
import sys
import subprocess
import re

# Garantir que a biblioteca Pillow está instalada para processamento de imagem
try:
    from PIL import Image
except ImportError:
    print("Biblioteca 'Pillow' não encontrada. Instalando...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image
        print("Pillow instalada com sucesso!")
    except Exception as e:
        print(f"Erro ao instalar Pillow: {e}")
        print("Por favor, execute o comando manualmente: pip install Pillow")
        sys.exit(1)

def extract_number(filename):
    """Extrai o número do nome do arquivo para ordenação correta."""
    match = re.search(r'(\d+)', filename)
    return int(match.group(1)) if match else 0

def main():
    src_dir = "public/transition"
    dest_dir = "public/sequence_mobile"
    
    if not os.path.exists(src_dir):
        print(f"Erro: Pasta de origem '{src_dir}' não encontrada.")
        sys.exit(1)
        
    # Criar pasta de destino se não existir
    os.makedirs(dest_dir, exist_ok=True)
    
    # Limpar a pasta de destino para evitar arquivos órfãos (como 0041.webp a 0119.webp)
    print("Limpando a pasta public/sequence de frames antigos...")
    for f in os.listdir(dest_dir):
        file_path = os.path.join(dest_dir, f)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Erro ao deletar {f}: {e}")
            
    print(f"Pasta de origem identificada: {src_dir}")
    print(f"Pasta de destino limpa: {dest_dir}\n")
    
    # Listar e ordenar arquivos numericamente
    allowed_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    files = [f for f in os.listdir(src_dir) if f.lower().endswith(allowed_extensions)]
    files.sort(key=extract_number)
    
    if not files:
        print("Nenhuma imagem válida encontrada em public/transition para processamento.")
        sys.exit(1)
        
    print(f"Encontrados {len(files)} arquivos. Iniciando otimização para WebP sequencial...")
    
    # Parâmetros de otimização
    QUALITY = 70          # Qualidade do WebP ideal para performance
    MAX_WIDTH = 1080      # Ajustado para 9:16 vertical para celulares de alta densidade
    
    total_original_size = 0
    total_optimized_size = 0
    
    for index, filename in enumerate(files, start=1):
        src_path = os.path.join(src_dir, filename)
        dest_filename = f"{index:04d}.webp"  # Formato 0001.webp, 0002.webp
        dest_path = os.path.join(dest_dir, dest_filename)
        
        # Calcular tamanho original
        original_size = os.path.getsize(src_path)
        total_original_size += original_size
        
        try:
            with Image.open(src_path) as img:
                # Converter para RGB se necessário (imagens transparentes ou greyscale)
                if img.mode in ('RGBA', 'LA'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1])
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Redimensionar se exceder largura máxima para performance de scroll
                width, height = img.size
                if width > MAX_WIDTH:
                    new_height = int((MAX_WIDTH / width) * height)
                    img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                
                # Salvar em formato WebP otimizado (método 6 = melhor compressão, qualidade 70)
                img.save(dest_path, "WEBP", quality=QUALITY, method=6, optimize=True)
                
            optimized_size = os.path.getsize(dest_path)
            total_optimized_size += optimized_size
            
            reduction = ((original_size - optimized_size) / original_size) * 100
            print(f"[{index:03d}/{len(files)}] {filename} -> {dest_filename} | Redução de {reduction:.1f}%")
            
        except Exception as e:
            print(f"Erro ao processar {filename}: {e}")
            
    # Estatísticas finais
    orig_mb = total_original_size / (1024 * 1024)
    opt_mb = total_optimized_size / (1024 * 1024)
    saved_mb = orig_mb - opt_mb
    saved_percent = (saved_mb / orig_mb) * 100 if orig_mb > 0 else 0
    
    print("\n" + "="*50)
    print("PROCESSO DE OTIMIZAÇÃO CONCLUÍDO COM SUCESSO!")
    print("="*50)
    print(f"Tamanho total original:  {orig_mb:.2f} MB")
    print(f"Tamanho total otimizado: {opt_mb:.2f} MB")
    print(f"Economia de espaço:      {saved_mb:.2f} MB ({saved_percent:.1f}% de redução)")
    print(f"Arquivos salvos em:      {dest_dir}")
    print("="*50)

if __name__ == "__main__":
    main()
