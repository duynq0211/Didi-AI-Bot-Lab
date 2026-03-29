# �� PRODUCT CONCEPT: DỰ ÁN CHATBOT CÁ NHÂN (AEGIS BOT - "LÁ CHẮN AI")
> **Phiên bản:** 1.0 — **Ngày:** 2026-03-29 — **Tác giả:** Duy (PO) + PM Review

---

## 📌 BỐI CẢNH & NGUỒN GỐC Ý TƯỞNG

**Vấn đề thực tế đặt ra:**
- Chị Hạnh (chị vợ) đang bị chồng cũ nhắn tin quấy rối, gây áp lực tâm lý kéo dài.
- Mỗi lần bị quấy rối, chị Hạnh gửi tin nhắn vào Group Chat 3 người (gồm chị Thục và Duyên - vợ người dùng) để nhờ hỗ trợ cách xử lý.
- **Hệ quả:** Chị Thục và Duyên phải đọc các lời lẽ mất dạy → ức chế, tức giận lây, kiệt sức tâm lý. Ngoài ra không phải lúc nào cũng có thể phản hồi ngay cho chị Hạnh.

**Nỗi đau cụ thể:**
1. Chị Hạnh không biết cách phản hồi dứt khoát, hay bị mắc bẫy đôi co.
2. Chị Thục và Duyên chịu "vết thương thứ cấp" (Secondary Trauma) mỗi lần đọc tin nhắn độc hại.
3. Không có sự hỗ trợ tức thì 24/7 — kẻ quấy rối hay chọn nửa đêm hoặc giờ làm việc.

---

## 💡 ĐỊNH VỊ SẢN PHẨM

**Tên sản phẩm:** Lá Chắn AI (Aegis Bot)
**Tagline:** *"Chặn đứng mọi thao túng tâm lý — trong vòng 2 giây."*
**Định vị:** Trợ lý AI bảo mật cục bộ (Self-hosted), chuyên phân tích và phản công các tin nhắn quấy rối/thao túng tâm lý.

---

## 🎯 GIÁ TRỊ CỐT LÕI (Core Value Proposition)

### 1. Chiến thuật "Grey Rock" (Hòn đá xám) mặc định
Bot được nạp sẵn kỹ năng tâm lý học chuyên nghiệp. Mọi câu trả lời đều theo nguyên tắc:
> **Ngắn gọn — Vô cảm — Không giải thích — Chặn đứng vấn đề.**
Kẻ quấy rối đấm vào bông, tự khắc sẽ chán.

### 2. Bộ lọc Cảm xúc (Emotional Neutralizer)
Dù tin nhắn chồng cũ dài 2 trang A4 chửi rủa, AI sẽ tóm tắt lại 1 câu nhẹ nhàng:
> *"Hắn đang chửi đổng và đòi lại tiền tã tháng trước."*
→ Chặn đứng sự ức chế xâm nhập vào não bộ chị Hạnh, Thục và Duyên.

### 3. Phản ứng tức thì 24/7
Chị Hạnh ném text vào → 2 giây sau có ngay câu trả lời chuẩn để copy bắn lại. Không cần chờ Duyên hay Thục online.

### 4. Tuyệt đối bảo mật (Privacy-first / Self-hosted)
Toàn bộ tin nhắn nhạy cảm của gia đình chạy trên server/máy tính riêng của người dùng. **Không ai ngoài gia đình có thể đọc được**, kể cả nhà cung cấp AI.

---

## 🔄 LUỒNG HOẠT ĐỘNG (User Flow)

```
Chồng cũ nhắn tin khốn nạn
        ↓
Chị Hạnh copy tin nhắn → thả vào Group Chat → gọi @LaChan xử lý giùm
        ↓
[AI xử lý - không cần Thục/Duyên phải đọc raw text]
        ↓
Bot phân tích thủ đoạn → Đưa ra 3 phương án phản hồi để chọn
        ↓
Chị Hạnh copy option ưng nhất → Gửi lại chồng cũ (trong 10 giây)
        ↓
Thục & Duyên thả tim ❤️ trong group → tiếp tục làm việc bình thường
```

---

## 🗂️ 3 PHƯƠNG ÁN PHẢN HỒI MẪU (Response Templates)

Mỗi lần bot xử lý, nó sẽ tự động đề xuất 3 loại phản hồi tuỳ ngữ cảnh:

| Option | Chiến lược | Nội dung mẫu |
|--------|-----------|--------------|
| **A** | Cắt cầu, chốt hạ lạnh lùng | *"Sự việc này tôi đã ra quyết định xong. Sẽ không thảo luận thêm dưới bất kỳ hình thức nào."* |
| **B** | Phân định ranh giới (có con) | *"Tôi chỉ trao đổi đúng nội dung lịch thăm con. Những nội dung thừa thãi tôi từ chối đọc và từ chối phản hồi."* |
| **C** | Đe dọa pháp lý | *"Tin nhắn này mang tính chất quấy rối. Tôi đã lưu làm bằng chứng. Yêu cầu chấm dứt ngay lập tức."* |

---

## 🏗️ KIẾN TRÚC HỆ THỐNG (Technical Architecture)

### Giai đoạn 1 (MVP) — Hoạt động qua Telegram Group
```
[Group Telegram: Hạnh + Thục + Duyên + @Bot]
        ↓ (Webhook)
[Backend Server: Python/Node.js chạy local hoặc VPS riêng]
        ↓ (API Call)
[LLM Engine: Gemini API / OpenAI / Ollama (local model)]
        ↓ (System Prompt)
[Personality: Chuyên gia tâm lý, chiến thuật Grey Rock, luật VN]
```

### Giai đoạn 2 — Tính năng tăng cường
- **Auto-Evidence Tracker:** Tự động lưu log tin nhắn toxic → Xuất PDF làm hồ sơ pháp lý.
- **Soothing Aftercare:** Sau khi chị Hạnh rep xong, bot tự động gửi lời động viên nhẹ nhàng cho cả group.
- **Threat Level Meter:** Đánh giá mức độ nguy hiểm (Cảnh báo/Bình thường/Cần pháp lý) của mỗi tin nhắn.

---

## 📐 TECH STACK ĐỀ XUẤT

| Thành phần | Công nghệ |
|-----------|-----------|
| **Nền tảng chat** | Telegram Bot API (dễ tích hợp, bảo mật cao) |
| **Backend** | Python (FastAPI) hoặc Node.js (Express) |
| **AI Engine** | Gemini API (free tier) hoặc OpenAI GPT-4o-mini |
| **Local AI (nếu offline)** | Ollama + Llama 3 / Qwen 2.5 |
| **Database (log bằng chứng)** | SQLite (local) hoặc Supabase (cloud riêng) |
| **Deploy** | Máy tính ở nhà + ngrok / VPS riêng (Render, Railway free tier) |

---

## 📊 ROADMAP TRIỂN KHAI

| Phase | Thời gian | Mục tiêu |
|-------|-----------|---------|
| **Phase 1 (MVP)** | Tuần 1 | Bot reply được trong Group Telegram, có System Prompt chuẩn "Grey Rock" |
| **Phase 2** | Tuần 2–3 | Thêm Auto-Evidence Log, Emotional Summary, 3 option response |
| **Phase 3** | Tháng 2 | Threat Level, Aftercare messages, xuất được file PDF hồ sơ |

---

## ✅ ĐO LƯỜNG THÀNH CÔNG

| Chỉ số | Mục tiêu |
|--------|---------|
| Thời gian phản hồi của chị Hạnh | < 10 giây sau khi nhận tin nhắn khốn nạn |
| Mức độ stress của Thục & Duyên | Không còn phải đọc raw text của chồng cũ |
| Tần suất dùng | Chị Hạnh dùng Bot thay vì hỏi người mỗi lần bị quấy rối |
| Hồ sơ pháp lý | Có đủ bằng chứng nếu cần can thiệp pháp lý |

---

## 🗣️ LỜI KẾT (PM's Note)

> Sản phẩm này giải quyết một bài toán thực tế và cấp bách: **Giải phóng toàn bộ "Emotional Labor" (Lao động cảm xúc)** cho 3 người phụ nữ trong gia đình.
>
> AI là công cụ hoàn hảo nhất vì **nó không có cảm xúc** — không bị khích tướng, không bị thao túng tâm lý, không mệt mỏi. Nó sẽ thay bạn bảo vệ tinh thần cho các chị em phụ nữ một cách bài bản và triệt để nhất.

---

## 📝 BƯỚC TIẾP THEO (Next Actions)

- [ ] Draft System Prompt chuẩn (Nhân cách Bot + Chiến thuật + Luật VN liên quan)  
- [ ] Tạo Telegram Bot Account (@AegisBotVN)  
- [ ] Code Backend MVP (Python FastAPI + Gemini API)  
- [ ] Test với các tình huống thực tế chị Hạnh hay gặp  
- [ ] Deploy lên máy tính local / VPS riêng  

