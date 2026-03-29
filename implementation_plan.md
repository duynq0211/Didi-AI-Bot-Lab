# 🛡️ KẾ HOẠCH TRIỂN KHAI: SIÊU PROTOTYPE "AEGIS AI PLATFORM" (PHIÊN BẢN EXPERT)

Dựa trên yêu cầu của PM về việc trực quan hóa Concept cho Aegis AI Platform (Lá Chắn AI), tôi đề xuất một bản Prototype cao cấp có khả năng tương tác cao. Mục tiêu là tạo ra một bản demo "WOW" ngay từ cái nhìn đầu tiên, giúp stakeholders thấu hiểu giá trị của sản phẩm trong việc bảo vệ ranh giới cảm xúc.

## 🎨 CHIẾN LƯỢC THẨM MỸ (PREMIUM DESIGN STRATEGY)

Dự án này đòi hỏi sự cân bằng giữa **"Sự an tâm (Safety)"** và **"Công nghệ thông minh (Intelligence)"**.

- **Design System: "Obsidian Guard"**
  - **Color Palette:** 
    - Nền: `hsl(230, 20%, 8%)` (Dark Obsidian) - Tạo chiều sâu và sự tĩnh lặng.
    - Màu chính: `hsl(180, 100%, 50%)` (Neon Cyan) - Đại diện cho Lá chắn và AI.
    - Cảnh báo: `hsl(350, 80%, 55%)` (Soft Crimson) - Dành cho Threat Levels.
    - Xoa dịu: `hsl(260, 60%, 75%)` (Lavender Sky) - Cho phần Aftercare.
  - **UI Style:** Glassmorphism hiện đại với `backdrop-filter: blur(20px)`, viền mờ (subtle borders) và đổ bóng động.
  - **Typography:** `Outfit` cho headings (hiện đại, bo tròn thân thiện) và `Inter` cho nội dung (rõ ràng, chuyên nghiệp).

## 🧩 CHI TIẾT CÁC MÀN HÌNH & LUỒNG (UI COMPONENTS)

Prototype sẽ được xây dựng dưới dạng **Single Page Application (SPA)** với các Module sau:

### 1. Dashboard "Tổng Chỉ Huy" (Persona Management)
- **Top Bar:** Trạng thái hệ thống và Avatar người dùng.
- **Shield Cards:** Grid các hồ sơ bảo vệ (VD: "@Chồng Cũ", "@Sếp_Toxic"). Mỗi card hiển thị chỉ số "Emotional Health" của người dùng trong mối quan hệ đó.
- **Global Threat Meter:** Biểu đồ sóng (Waveform) thể hiện áp lực quấy rối theo thời gian.

### 2. Trái Tim Hệ Thống: Aegis Interceptor (Luồng Xử Lý Tin Nhắn)
- **Layout 2 Cột:** 
  - **Cột Trái (Message Input):** Một khung chat mô phỏng Telegram. Người dùng paste "Deep Toxic" vào đây.
  - **Cột Phải (Analysis Engine):** 
    - Hiệu ứng "AI Decrypting..." mượt mà.
    - **Tab "Fact vs Toxic":** Bóc tách sự thật khỏi sự đả kích (Dùng màu sắc để highlight).
    - **Tab "Intent Decryption":** Chỉ ra các thủ đoạn tâm lý (VD: Guilt-tripping, Gaslighting).
    *   **Action Drawer:** Hiện 3 nút Option A/B/C với Preview nội dung khi hover.

### 3. Aegis Academy & Feedback (Luồng Học Tập)
- **Feedback Overlay:** Màn hình hỏi đáp sau khi người dùng gửi phản hồi (VD: "Đối tượng phản ứng thế nào?").
- **Learning Visualization:** Một Node-graph nhỏ thể hiện "Behavior Profile" của đối tượng đang dần hình thành.
- **Aftercare Card:** Một thông điệp khẳng định tích cực hiện ra nhẹ nhàng ở góc màn hình.

### 4. Evidence Vault (Kho Bằng Chứng)
- Dạng bảng (Table) cực kỳ sạch sẽ, bảo mật cao.
- Có tính năng "Quick Filter" theo mức độ nguy hiểm.
- Nút **"Generate Legal Dossier"** (Xuất PDF mô phỏng) với hiệu ứng tạo file.

## 🛠️ QUYẾT ĐỊNH KỸ THUẬT (TECH STACK FOR PROTOTYPE)

Tôi đã đưa ra quyết định tối ưu cho buổi Demo:
- **Ngôn ngữ:** Vanilla HTML5, CSS3 (Modern Flex/Grid), Javascript (ES6+).
- **Phân phối:** Một thư mục `prototype/` duy nhất. Bạn chỉ cần mở `index.html` trong Chrome/Safari là có thể demo 100% tính năng mà không cần cài đặt Web Server.
- **Animation:** Dùng thư viện `Framer Motion` (phiên bản nhẹ) hoặc `CSS Keyframes` để đảm bảo độ mượt 60fps.

## ❓ CÂU HỎI MỞ & GIẢ ĐỊNH (OPEN QUESTIONS)

> [!IMPORTANT]
> **1. Dữ liệu mẫu (Sample Data):** Bạn có muốn tôi sử dụng các tin nhắn mẫu sát với bối cảnh thực tế (vụ việc chồng cũ quấy rối) để demo tăng tính thuyết phục không? Hay dùng dữ liệu giả generic?
> 
> **2. Tương tác "Magic":** Bạn có muốn prototype có khả năng "giả lập" việc gửi tin nhắn quay lại Telegram (mô phỏng Webhook) không, hay chỉ cần hiển thị kết quả trên giao diện là đủ?

## 🗓️ KẾ HOẠCH THỰC HIỆN (EXECUTION PLAN)

1. [ ] Thiết lập Base Styles & Design Tokens (CSS Variables).
2. [ ] Xây dựng khung Layout SPA (Sidebar + Main Content).
3. [ ] Code Module 1: Dashboard & Persona Cards.
4. [ ] Code Module 2: Aegis Interceptor (Trọng tâm của Prototype).
5. [ ] Code Module 3 & 4: Evidence Vault & Feedback Layer.
6. [ ] Tích hợp Micro-animations & Final Polish.

---

## ✅ KIỂM CHỨNG (VERIFICATION)
- Kiểm tra Responsive (Hiển thị tốt trên Laptop và Mobile - vì PM hay demo trên điện thoại).
- Đảm bảo tất cả các nút nhấn đều có phản hồi (Feedback) trực quan.
- Kiểm tra độ tương phản màu sắc đạt chuẩn WCAG (Dù là Dark Mode).

