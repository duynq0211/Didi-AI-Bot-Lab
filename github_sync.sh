#!/bin/bash
# Kịch bản tự động kiểm tra thay đổi và đồng bộ lên Github

# Nạp thêm biến môi trường (PATH) để Background job biết đường dẫn của git và SSH/Keychain
export PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH

# Di chuyển đến thư mục dự án
cd "/Users/lap14892-local/Library/CloudStorage/GoogleDrive-nguyenquangduy0211@gmail.com/My Drive/GOOGLE DRIVE/01. My Work/04. My Lab/01. Chatbot Assistant" || exit 1

# Kiểm tra xem có bất kỳ thay đổi nào không
if [[ -n $(git status -s) ]]; then
  git add .
  git commit -m "Auto-sync update: $(date +'%Y-%m-%d %H:%M:%S')"
  
  # Đẩy code lên GitHub
  git push origin main
fi
