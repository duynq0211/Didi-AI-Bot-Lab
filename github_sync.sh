#!/bin/bash
# Kịch bản tự động kiểm tra thay đổi và đồng bộ lên Github

# Nạp thêm biến môi trường (PATH) để Background job biết đường dẫn của git và SSH/Keychain
export PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH

# Di chuyên đen thư mục dự án
cd "/Users/lap16947/Lab/Didi Ai Bot" || exit 1

# Kiểm tra xem có bất kỳ thay đổi nào không
if [[ -n $(git status -s) ]]; then
  git add .
  git commit -m "Auto-sync update: $(date +'%Y-%m-%d %H:%M:%S')"
  
  # Đẩy code lên GitHub
  git push origin main
fi
