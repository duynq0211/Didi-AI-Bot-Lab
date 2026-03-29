document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Audio System (Synthetic Pop) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playPop() {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    }

    // --- 2. Zalo Navbar & View Switching ---
    const navIcons = document.querySelectorAll('.nav-icon');
    const views = document.querySelectorAll('.view');
    const zaloNav = document.querySelector('.zalo-nav');
    let chartRendered = false;

    window.switchView = function(viewId) {
        views.forEach(v => v.classList.remove('active-view'));
        document.getElementById(viewId).classList.add('active-view');
        
        if (viewId === 'view-admin') {
            zaloNav.style.display = 'none'; // Hide Zalo Nav
            if (!chartRendered) {
                selectIncident(document.querySelector('#tab-behavior .m-item.active'), 'case14');
                chartRendered = true;
            }
        } else {
            zaloNav.style.display = 'flex'; // Show Zalo Nav
            navIcons.forEach(n => n.classList.remove('active'));
            document.querySelector('[data-target="view-zalo"]').classList.add('active');
        }
    };

    window.navigateToDashboard = function(tabId) {
        switchView('view-admin');
        const tabBtn = document.querySelector(`.atab[data-tab="tab-${tabId}"]`);
        if(tabBtn) tabBtn.click();
    };

    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            navIcons.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            if(targetId) switchView(targetId);
        });
    });

    // --- Toggle evidence table message expand/collapse ---
    window.toggleMsg = function(btn) {
        const td = btn.closest('td');
        const shortEl = td.querySelector('.msg-short');
        const fullEl = td.querySelector('.msg-full');
        const isExpanded = fullEl.style.display !== 'none';
        shortEl.style.display = isExpanded ? 'inline' : 'none';
        fullEl.style.display  = isExpanded ? 'none' : 'inline';
        btn.textContent = isExpanded ? 'xem thêm ▾' : 'thu gọn ▴';
    };

    // --- 3. Chat UI & Sequencing ---
    const chatAnchor = document.getElementById('dynamic-chat-anchor');
    const chatScroll = document.getElementById('zalo-chat-scroll');
    
    function getCurrentTime() {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    function scrollToBottom() {
        setTimeout(() => { chatScroll.scrollTop = chatScroll.scrollHeight; }, 50);
    }

    // Helper to insert message
    function insertMessage(type, sender, avatar, bubbleClass, content, time = null) {
        const html = `
            <div class="chat-msg ${type} mt-3 fade-in-up">
                ${type === 'msg-other' ? `<img src="${avatar}" alt="" class="msg-avatar">` : ''}
                <div class="msg-content">
                    ${type === 'msg-other' ? `<span class="msg-sender-name">${sender}</span>` : ''}
                    <div class="bubble ${bubbleClass}">
                        ${content}
                        <span class="msg-time">${time || getCurrentTime()}</span>
                    </div>
                </div>
            </div>
        `;
        chatAnchor.insertAdjacentHTML('beforebegin', html);
        playPop();
        scrollToBottom();
        return chatAnchor.previousElementSibling;
    }

    // Simulate Conversation on Load
    const hanhAvatar = 'https://ui-avatars.com/api/?name=Han&background=8B008B&color=fff';
    const thucAvatar = 'https://ui-avatars.com/api/?name=Thu&background=FF8C00&color=fff';
    const honiAvatar = 'https://ui-avatars.com/api/?name=Hon&background=FF69B4&color=fff';

    setTimeout(() => {
        // Hạnh forwards message
        insertMessage('msg-other', 'Chị Hạnh (Duyên\'s sis)', hanhAvatar, 'bubble-other border-danger', `
            <div class="forwarded-tag text-danger"><i class="fa-solid fa-share"></i> Chuyển tiếp từ: thằng md</div>
            Đấy ! Lần nào tôi có thiện chí bù đắp cho con thì cô cũng kiếm cớ nọ kia để từ chối! Lúc nào lên mạng cũng than khóc mẹ đơn thân vất vả, nhưng khi tôi giang tay gánh vác hộ thì cô lại tìm cách cực đoan cản trở, tước đoạt quyền làm cha của tôi. Cứ cái đà này tôi sẽ đưa ra tòa!
        `);
        
        setTimeout(() => {
            const msgHanh = insertMessage('msg-other', 'Chị Hạnh (Duyên\'s sis)', hanhAvatar, 'bubble-other', `Tức ghé luôn á. Mọi người coi thằng md lật lọng khum? Gởi tiền cho con thì khum gởi mà hở ra là nhây đòi đưa nhau ra tòa bộ dễ ăn của ngoại lắm hỡ.`);
            
            setTimeout(() => {
                const bubble = msgHanh.querySelector('.bubble');
                if(bubble) bubble.insertAdjacentHTML('beforeend', '<div class="zalo-reaction fade-in-up"><span>😡</span> <span>3</span></div>');
            }, 1500);

            setTimeout(() => {
                insertMessage('msg-other', 'Duyên Nguyễn', honiAvatar, 'bubble-other', `Khùng hả trời 😤 Thằng md nó lật lọng cộc rồi. <span class="mention-tag" contenteditable="false">@Quang Duy</span> hqua a code cái hệ thống Bot hoàn thiện chửa, quăng link vô đây check cho chị Hạnh coi ik.`);
                
                setTimeout(() => {
                    const adminMsg = insertMessage('msg-me', 'Me', '', 'bubble-me', `
                        Đây đây<br>
                        <div class="zalo-link-wrapper mt-2 mb-2" id="admin-link-trigger" onclick="switchView('view-admin')">
                            <a href="#" class="zalo-link-url" onclick="event.preventDefault()">ciuciu.vn/tracking-dashboard?case=14&ref=zalo_share_id19A24b</a>
                            <div class="zalo-link-card">
                                <img src="dashboard_preview.png" alt="Didi AI Bot Lab Dashboard"/>
                                <div class="zalo-link-content">
                                    <span class="zalo-link-domain">ciuciu.vn</span>
                                    <div class="zalo-link-title">Cíu Cíu Dashboard - Phân tích tâm lý chuyên sâu</div>
                                    <div class="zalo-link-desc">Hệ thống phân tích ngôn ngữ thao túng chuyên sâu. Trích xuất file log và cấu trúc hành vi cho chị Hạnh.</div>
                                </div>
                            </div>
                        </div>
                    `);
                    adminMsg.id = "target-admin-msg";
                    
                    setTimeout(() => {
                        const msgThuc = insertMessage('msg-other', 'chị Thục', thucAvatar, 'bubble-other', 
                        `Ủa xịn dị =))) Tới công chiện. Để vô coi chả xài chiêu gì. Gắn tag <span class="mention-tag" contenteditable="false">@cíu cíu</span> vô chửi lẹ coi. Đầu năm nén khổ vụ này lâu r =))`);

                        setTimeout(() => {
                            const bubble = msgThuc.querySelector('.bubble');
                            if(bubble) bubble.insertAdjacentHTML('beforeend', '<div class="zalo-reaction fade-in-up"><span>❤️👍</span> <span>8</span></div>');
                            
                            // START INTERACTIVE WAIT
                            setTimeout(() => {
                                showMentionHint();
                            }, 1000);
                        }, 1200);

                    }, 4000);
                }, 3500);
            }, 3000);
        }, 2500);
    }, 1500);

    // --- 4. Mentions System & Input ---
    const chatInputBox = document.getElementById('chat-input-box');
    const sendBtn = document.getElementById('btn-send-chat');
    const mentionMenu = document.getElementById('mention-menu');
    let mentionActive = false;

    window.showMentionHint = function() {
        let overlay = document.getElementById('chat-dark-overlay');
        if(!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'chat-dark-overlay';
            overlay.style.cssText = 'position: absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index: 15; pointer-events:auto; transition: opacity 0.3s; display:block;';
            overlay.onclick = () => hideMentionHint();
            document.querySelector('.zalo-main-chat').style.position = 'relative';
            document.querySelector('.zalo-main-chat').appendChild(overlay);
        }
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);

        const atBtn = document.querySelector('.fa-at');
        atBtn.style.zIndex = '16';
        atBtn.style.backgroundColor = '#fff';
        atBtn.style.borderRadius = '50%';
        atBtn.style.boxShadow = '0 0 0 4px #fff, 0 0 0 12px rgba(0,104,255,0.4), 0 0 20px 5px rgba(255,255,255,0.6)';
        atBtn.style.animation = 'pulse-btn 1.5s infinite';
        
        let hint = document.getElementById('mention-tooltip');
        if(!hint) {
            hint = document.createElement('div');
            hint.id = 'mention-tooltip';
            hint.innerHTML = 'Bấm vào đây <i class="fa-solid fa-hand-pointer fa-bounce"></i>';
            hint.style.cssText = 'position: absolute; bottom: 45px; transform: translateX(-50%); background: #0068ff; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; white-space: nowrap; pointer-events: none; z-index: 16; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
            hint.innerHTML += '<div style="position:absolute; bottom:-5px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:6px solid #0068ff;"></div>';
            atBtn.parentElement.style.position = 'relative';
            atBtn.parentElement.appendChild(hint);
        }
        hint.style.left = (atBtn.offsetLeft + 16) + 'px';
    };

    window.hideMentionHint = function() {
        const overlay = document.getElementById('chat-dark-overlay');
        if(overlay) {
            overlay.remove();
        }
        const atBtn = document.querySelector('.fa-at');
        if(atBtn) {
            atBtn.removeAttribute('style');
        }
        const hint = document.getElementById('mention-tooltip');
        if(hint) hint.remove();
    };

    window.triggerMention = function() {
        hideMentionHint();
        chatInputBox.innerHTML = '@cíu cíu, tư vấn giúp Hạnh nhé!!';
        chatInputBox.dispatchEvent(new Event('input', { bubbles: true }));
        setTimeout(() => {
            handleSend();
            mentionActive = false;
            mentionMenu.classList.add('hidden');
        }, 50);
    };

    chatInputBox.addEventListener('input', function(e) {
        hideMentionHint();
        const text = this.innerText;
        if(text.endsWith('@')) {
            mentionActive = true;
            mentionMenu.classList.remove('hidden');
        } else if (text.slice(-1) === ' ') {
            mentionActive = false;
            mentionMenu.classList.add('hidden');
        }
    });

    document.querySelectorAll('.mention-item').forEach(item => {
        item.addEventListener('click', function() {
            hideMentionHint();
            const name = this.getAttribute('data-name');
            let content = chatInputBox.innerHTML;
            content = content.replace(/@$/, `<span class="mention-tag" contenteditable="false">@${name}</span>&nbsp;`);
            chatInputBox.innerHTML = content;
            mentionActive = false;
            mentionMenu.classList.add('hidden');
            
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(chatInputBox);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            chatInputBox.focus();
        });
    });

    function handleSend() {
        hideMentionHint();
        const textContent = chatInputBox.innerText.trim();
        let htmlContent = chatInputBox.innerHTML.trim();
        if (!textContent) return;
        
        // Auto wrap manual @ciu ciu mentions
        if (textContent.toLowerCase().includes('@ciu ciu') || textContent.toLowerCase().includes('@cíu cíu')) {
            htmlContent = htmlContent.replace(/@(ciu ciu|cíu cíu)/gi, '<span class="mention-tag" contenteditable="false">@cíu cíu</span>');
        }
        
        insertMessage('msg-me', 'Me', '', 'bubble-me', htmlContent);
        chatInputBox.innerHTML = '';
        
        const textLower = textContent.toLowerCase();
        if (textLower.includes('@ciu ciu') || textLower.includes('@cíu cíu')) {
            document.getElementById('zalo-pinned-msg').style.display = 'flex';
            setTimeout(triggerBotPsychologyAnalysis, 1500);
        }
    }

    sendBtn.addEventListener('click', handleSend);
    chatInputBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if(!mentionActive) handleSend();
        }
    });

    // --- 5. Bot Analysis Sequence ---
    function showTypingIndicator() {
        const typingHtml = `
            <div class="chat-msg msg-other bot-block fade-in-up" id="bot-typing">
                <img src="https://ui-avatars.com/api/?name=Ciu&background=0068ff&color=fff" alt="" class="msg-avatar">
                <div class="msg-content bot-content">
                    <span class="msg-sender-name text-aegis">cíu cíu</span>
                    <div class="bubble bubble-other" style="padding: 12px 16px;">
                        <span class="text-primary"><i class="fa-solid fa-radar fa-spin"></i> Đang đọc log...</span>
                    </div>
                </div>
            </div>`;
        chatAnchor.insertAdjacentHTML('beforebegin', typingHtml);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const el = document.getElementById('bot-typing');
        if (el) el.remove();
    }

    function triggerBotPsychologyAnalysis() {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            appendBotResponse();
        }, 3000);
    }

    function appendBotResponse() {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            const botHtml = `
                <div class="chat-msg msg-other bot-block fade-in-up">
                    <img src="https://ui-avatars.com/api/?name=Ciu&background=0068ff&color=fff" alt="" class="msg-avatar">
                    <div class="msg-content bot-content">
                        <span class="msg-sender-name text-aegis">cíu cíu</span>
                        
                        <div class="bubble bubble-other" style="padding: 12px 16px; min-width: 260px;">
                            <b>CHẨN ĐOÁN HÀNH VI: THAO TÚNG TÂM LÝ & ĐÓNG VAI NẠN NHÂN</b><br><br>
                            Phân tích ngôn ngữ cho thấy: Đối tượng đang thực hiện thao túng tâm lý bằng đòn <b>Đảo ngược Nạn nhân</b>. Cố tình lờ đi thiện chí trước đó, và tập trung vào việc đe dọa Pháp lý để khống chế cục diện.<br><br>
                            <b>ĐỀ XUẤT 3 HƯỚNG XỬ LÝ:</b><br>
                            1. <b>Phương án A (Đá Xám):</b> Bỏ qua, không trả lời.<br>
                            2. <b>Phương án B (Ranh Giới):</b> Phản hồi lịch sự, từ chối tranh cãi.<br>
                            3. <b>Phương án C (Tối Hậu Thư Pháp Lý):</b> Yêu cầu chấm dứt đàm thoại, chỉ giao tiếp qua Email hoặc qua Luật sư.<br><br>
                            <i>Mọi người hội chẩn và biểu quyết nhé!</i>
                            <span class="msg-time">${getCurrentTime()}</span>
                        </div>
                    </div>
                </div>
            `;
            chatAnchor.insertAdjacentHTML('beforebegin', botHtml);
            scrollToBottom();

            // Simulate the iterative voting process
            setTimeout(() => {
                insertMessage('msg-other', 'Duyên Nguyễn', 'https://ui-avatars.com/api/?name=Duy&background=FF69B4&color=fff', 'bubble-other', 
                `Option C dính tới pháp lý gắt quá sợ chả lại làm khùng làm điên lên. Còn Option B thì hơi hiền. @cíu cíu có cách nào viết cứng rắn nhưng vẫn giữ phép sự, không cho chả cớ bóc phốt khum? 🥺`);
                
                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        const botHtml2 = `
                            <div class="chat-msg msg-other bot-block fade-in-up">
                                <img src="https://ui-avatars.com/api/?name=Ciu&background=0068ff&color=fff" alt="" class="msg-avatar">
                                <div class="msg-content bot-content">
                                    <span class="msg-sender-name text-aegis">cíu cíu</span>
                                    <div class="bubble bubble-other" style="padding: 12px 16px; min-width: 260px;">
                                        Đã nhận yêu cầu từ <span class="mention-tag" contenteditable="false">@Duyên Nguyễn</span> 🫡 Cíu Cíu tinh chỉnh kết hợp thành <b>Phương án B+ (Ranh Giới Thép)</b>:<br><br>
                                        Mục tiêu: Dùng sự lịch sự làm vũ khí phòng thủ để khoá mõm nạn nhân giả tạo.<br><br>
                                        <i>"Chào anh, tôi luôn ghi nhận thiện chí của anh. Tuy nhiên, lịch đón con thứ 7 đã được tự nguyện thống nhất để đảm bảo ổn định tâm lý cho con. Nếu anh không thể thu xếp, tuần này anh có thể dừng đón. Mọi sự thay đổi lịch đột xuất sẽ không được đáp ứng."</i>
                                    </div>
                                </div>
                            </div>
                        `;
                        chatAnchor.insertAdjacentHTML('beforebegin', botHtml2);
                        scrollToBottom();

                        setTimeout(() => {
                            const msgThuc = insertMessage('msg-other', 'chị Thục', 'https://ui-avatars.com/api/?name=Thu&background=FF8C00&color=fff', 'bubble-other', 
                            `Duyệt Option B+. Lời lẽ như vầy thì bố chả cũng không dám chụp màn hình bóc phốt =)))`);
                            
                            setTimeout(() => {
                                const bubble = msgThuc.querySelector('.bubble');
                                if(bubble) bubble.insertAdjacentHTML('beforeend', '<div class="zalo-reaction fade-in-up"><span>😆👍</span> <span>2</span></div>');
                            }, 1000);

                            setTimeout(() => {
                                insertMessage('msg-me', 'Me', '', 'bubble-me', 
                                `+1 <b>Option B+</b> nha chị Hạnh ơi.`);
                                
                                // Final Bot Summary
                                setTimeout(() => {
                                    showTypingIndicator();
                                    setTimeout(() => {
                                        hideTypingIndicator();
                                        const finalBotHtml = `
                                            <div class="chat-msg msg-other bot-block fade-in-up">
                                                <img src="https://ui-avatars.com/api/?name=Ciu&background=0068ff&color=fff" alt="" class="msg-avatar">
                                                <div class="msg-content bot-content">
                                                    <span class="msg-sender-name text-aegis">cíu cíu</span>
                                                    <div class="bubble bubble-other" style="padding: 12px 16px; min-width: 260px;">
                                                        [Didi AI Bot Lab] Đã tổng hợp: <b>Hội Đồng chốt hạ Phương án B+.</b><br><br>
                                                        <span class="mention-tag" style="padding: 0 4px;">@Chị Hạnh (Duyên's sis)</span> chị copy tin nhắn trong khung xám dưới đây để gởi thẳng đối tượng nhé:<br><br>
                                                        <div style="background: #f1f5f9; padding: 10px; border-left: 3px solid #0068ff; margin: 8px 0; font-family: monospace;">
                                                        "Chào anh, tôi luôn ghi nhận thiện chí của anh. Tuy nhiên, lịch đón con thứ 7 đã được tự nguyện thống nhất để đảm bảo ổn định tâm lý cho con. Nếu anh không thể thu xếp, tuần này anh có thể dừng đón. Mọi sự thay đổi lịch đột xuất sẽ không được đáp ứng."
                                                        </div>
                                                        <span class="msg-time">${getCurrentTime()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                        chatAnchor.insertAdjacentHTML('beforebegin', finalBotHtml);
                                        scrollToBottom();
                                        
                                        // Thêm Delay thả 100 tim và phản hồi của Hạnh
                                        setTimeout(() => {
                                            const botMessage = chatAnchor.previousElementSibling;
                                            const bubble = botMessage.querySelector('.bubble-other');
                                            if (bubble) bubble.insertAdjacentHTML('beforeend', '<div class="zalo-reaction fade-in-up" style="bottom: -12px; right: 12px;"><span>❤️</span> <span>100</span></div>');

                                            setTimeout(() => {
                                                insertMessage('msg-other', 'Chị Hạnh (Duyên\'s sis)', 'https://ui-avatars.com/api/?name=Han&background=8B008B&color=fff', 'bubble-other', 
                                                `Copy gửi đi rồi. Thằng chả đã im bặt không dám ho he gì nữa =))) Cám ơn <span class="mention-tag" contenteditable="false">@cíu cíu</span>, <span class="mention-tag" contenteditable="false">@chị Thục</span>, <span class="mention-tag" contenteditable="false">@Duyên Nguyễn</span> và <span class="mention-tag" contenteditable="false">@Quang Duy</span> nhiều nha!! 😭💖`);
                                                scrollToBottom();
                                                
                                                // Cíu cíu cập nhật lại
                                                setTimeout(() => {
                                                    showTypingIndicator();
                                                    setTimeout(() => {
                                                        hideTypingIndicator();
                                                        const updateHtml = `
                                                            <div class="chat-msg msg-other bot-block fade-in-up">
                                                                <img src="https://ui-avatars.com/api/?name=Ciu&background=0068ff&color=fff" alt="" class="msg-avatar">
                                                                <div class="msg-content bot-content">
                                                                    <span class="msg-sender-name text-aegis">cíu cíu</span>
                                                                    <div class="bubble bubble-other" style="padding: 12px 16px;">
                                                                        Dạ có ngay đây! Phân tích xong xuôi rồi, chị Hạnh vào xem "bản đồ tâm trí" của mấy khứa này nhé. Đảm bảo "sang chấn tâm lý" luôn! 😂
                                                                         <div class="zalo-link-wrapper" style="margin-top: 8px;">
                                                                             <div class="zalo-link-card" onclick="window.navigateToDashboard('behavior')">
                                                                                 <img src="dashboard_preview.png" alt="Dashboard Preview">
                                                                                 <div class="zalo-link-content">
                                                                                     <span class="zalo-link-domain">ciuciu.vn</span>
                                                                                     <span class="zalo-link-title">Cíu Cíu Dashboard - Phân tích tâm lý chuyên sâu</span>
                                                                                     <span class="zalo-link-desc">Hệ thống phân tích ngôn ngữ thao túng chuyên sâu. Trích xuất file log và cấu trúc hành vi cho chị Hạnh.</span>
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                        <span class="msg-time">${getCurrentTime()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        `;
                                                        chatAnchor.insertAdjacentHTML('beforebegin', updateHtml);
                                                        scrollToBottom();
                                                        scrollToBottom();
                                                    }, 3000);
                                                }, 4000);
                                            }, 4000);
                                        }, 4000);
                                    }, 4000);
                                }, 3000);
                            }, 4500);
                        }, 4000);
                    }, 4000);
                }, 4000);
            }, 5000);
        }, 3000);
    }

    // --- 6. Admin Tabbing & Selection Logic ---
    const adminTabs = document.querySelectorAll('.atab');
    const tabContents = document.querySelectorAll('.admin-tab-content');

    adminTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            adminTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active-tab'));
            
            this.classList.add('active');
            const target = this.getAttribute('data-tab');
            document.getElementById(target).classList.add('active-tab');
        });
    });

    const incidents = {
        'case14': {
            title: 'Chiến thuật Đổi Ngày Thăm Con & Đảo Ngược Nạn Nhân',
            evidence: '"Đấy ! Lần nào tôi có thiện chí bù đắp cho con thì cô cũng kiếm cớ nọ kia để từ chối! Lúc nào lên mạng cũng than khóc, nhưng khi tôi giang tay gánh vác hộ thì cô lại tìm cách cực đoan cản trở, tước đoạt quyền làm cha của tôi. Cứ cái đà này tôi sẽ đưa ra tòa!"',
            radar: [80, 50, 95, 20, 70, 85],
            radarExp: [
                { name: 'Gaslighting', score: 80, exp: 'Xuyên tạc hiện thực: Rõ ràng anh ta là người sai hẹn, nhưng lại bóp méo rằng chị Hạnh là người "kiếm cớ từ chối", khiến chị Hạnh tự vận vào mình sự nghi ngờ bản thân.', def: 'Thao túng tâm lý bằng cách bóp méo sự thật, phủ nhận sự kiện đã xảy ra, khiến nạn nhân nghi ngờ trí nhớ và nhận thức của chính mình. Kẻ thao túng viết lại lịch sử có lợi cho họ.', rec: 'Không giải thích, không chứng minh trí nhớ. Dùng câu khẳng định ngắn gọn: "Theo trí nhớ và tin nhắn lưu lại của tôi là..." rồi chấm dứt đàm thoại.'},
                { name: 'Guilt Tripping', score: 50, exp: 'Tiêm nhiễm tội lỗi: Nhắc lại việc chị "than khóc mẹ đơn thân" nhằm mỉa mai, lợi dụng sự yếu đuối để chị đâm ra áy náy.', def: '(Tiêm nhiễm tội lỗi) Dùng lời nói khơi gợi cảm giác áy náy, tội lỗi ở nạn nhân hòng điều khiển hành vi của họ thao theo ý muốn.', rec: 'Nhận diện ngay đây là đòn tấn công vào sự mủi lòng. Dùng "Hòn Đá Xám" - chỉ thả icon đã xem hoặc đáp "Tôi ghi nhận ý kiến của anh".'},
                { name: 'Victim Playing', score: 95, exp: 'Đóng vai Nạn nhân: Tự phong mình là "người cha thiện chí" đang bị "tước quyền", hoàn hảo hóa cái tôi và bôi đen đối thủ.', def: '(Đóng vai nạn nhân) Tự miêu tả bản thân như người chịu mọi bạo hành, bất hạnh nhằm thu hút sự thương hại, chối bỏ trách nhiệm và đảo ngược tình thế.', rec: 'Mặc kệ "sân khấu" diễn xuất của đối tượng. Tập trung vào vấn đề cốt lõi bằng cấu trúc: "Dù anh cảm thấy thế nào, thì thực tế là [Sự Kiện] và yêu cầu của tôi là [Yêu Cầu]".' },
                { name: 'Financial Abuse', score: 20, exp: 'Không có biểu hiện ép buộc tài chính rõ rệt trong câu nói này.', def: '(Bạo hành tài chính) Dùng tiền bạc làm công cụ thao túng, kiểm soát để ép nạn nhân phải lệ thuộc hoặc khuất phục.', rec: 'Lưu trữ lại toàn bộ sao kê ngân hàng.'},
                { name: 'Boundary Cross', score: 70, exp: 'Xâm phạm Ranh giới Thỏa thuận: Phá bỏ lịch hẹn cốt lõi thứ 7 đã chốt, tự ý xoay chuyển lịch trình của người khác.', def: '(Xâm phạm ranh giới) Hành động cố tình hoặc lặp đi lặp lại việc bước qua các giới hạn an toàn đã thống nhất để thể hiện quyền lực phá vỡ rào chắn.', rec: 'Sử dụng cấu trúc câu Cảnh Báo (DEAR MAN). Không đàm phán lại nội quy đã vạch ra.'},
                { name: 'Double Bind', score: 85, exp: 'Thuyết trói buộc nòng đôi: Tạo tình huống ép chị Hạnh phải sai. Cho dồn chị vào góc "Con đi học không qua đón được", hễ chị từ chối thì anh ta gán tội cản trở luật pháp.', def: '(Bẫy Nòng Đôi) Tạo ra một tình huống "tiến thoái lưỡng nan" (lose-lose), nơi nạn nhân phản ứng theo cách nào (Đồng ý hay Từ chối) cũng sẽ bị buộc tội hoặc trừng phạt.', rec: 'Tuyệt đối KHÔNG trả lời theo "Có" hay "Không" (Yes/No answer). Phá vỡ bẫy bằng cách chỉ ra sự vô lý của giả lập đó.'}
            ],
            intent: 'Việc đổi lịch sang ngày "Con bận học" thực chất là màn bài trí <b>Bẫy Nòng Đôi (Double Bind)</b>. Chủ đích là bọc lót cho màn <b>Thao túng & Đóng vai Nạn nhân</b> phía sau, nhằm thao túng quyền lực và trừng phạt vị thế.',
            action: '"Anh vi phạm lịch thỏa thuận đón con vào thứ 7 thì sẽ không tính bù ngày khác. Việc anh dọa ra Tòa đã được em chụp màn hình. Mời anh làm việc đúng luật."'
        },
        'case13': {
            title: 'Chiến thuật Nhỏ Giọt Tiền Học (Financial Control)',
            evidence: '"Tháng này công ty kẹt dòng tiền nên anh đi công tác chưa về kịp. Chắc mùng 10 anh mới gởi con được. Em cứ ứng ra trước hoặc mượn đỡ ai đi, có xíu tiền mà cứ phải làm ầm lên, em thiếu bao dung với anh quá!"',
            radar: [40, 70, 30, 95, 80, 30],
            radarExp: [
                { name: 'Gaslighting', score: 40, exp: 'Gắn mác chị Hạnh "làm ầm lên" dù chị chỉ đòi quyền lợi cơ bản.', def: 'Bóp méo sự thật.', rec: 'Giữ thái độ lạnh nhạt.' },
                { name: 'Guilt Tripping', score: 70, exp: 'Đổ lỗi "thiếu bao dung", dùng dằng tình cảm để phủ nhận trách nhiệm vật chất.', def: 'Dùng lời nói khơi gợi cảm giác áy náy.', rec: 'Bỏ qua mọi đánh giá đạo đức của đối phương.'},
                { name: 'Victim Playing', score: 30, exp: 'Đóng vai người gặp khó khăn dòng tiền công ty.', def: 'Tự phong làm nạn nhân.', rec: 'Không tỏ sự cảm thông.' },
                { name: 'Financial Abuse', score: 95, exp: 'Bạo hành Tài chính: Dùng tiền làm công cụ trừng phạt. Bắt nạn nhân "ứng ra trước" để duy trì thế độc tôn về nguồn lực.', def: 'Thao túng thông qua giam giữ nguồn cung tiền bạc.', rec: 'Ra deadline duy nhất 1 lần. Không thỏa hiệp ứng trước.'},
                { name: 'Boundary Cross', score: 80, exp: 'Phá vỡ giới hạn thời gian cơ bản của việc nuôi con.', def: 'Cố tình phá vỡ thỏa thuận.', rec: 'Cảnh báo về hậu quả pháp lý.'},
                { name: 'Double Bind', score: 30, exp: 'Ít có yếu tố bẫy nòng đôi.', def: 'Bẫy nòng đôi (Double Bind).', rec: 'Nhận diện.'}
            ],
            intent: 'Chồng cũ dùng việc mập mờ tiền học phí để duy trì sợi dây liên kết và kiểm soát tài chính <b>(Financial Abuse)</b>. Việc "quên" nộp tiền đúng hạn không phải lỗi sơ suất, mà là vũ khí tạo cảm giác bất an (Anxiety trigger) kéo dài hệ lụy.',
            action: '"Trường thông báo hạn chót nộp học phí là ngày 15. Anh gởi thẳng vô stk nhà trường trước hạn nhé. Em không có nghĩa vụ đóng thay khoản này."'
        },
        'case12': {
            title: 'Khơi mào Bôi Nhọ trên Facebook (Smear Campaign)',
            evidence: '[Facebook Post]: "Nhiều người làm mẹ đơn thân lạ lắm, suốt ngày kêu than nghèo khổ không có tiền nuôi con, nhưng hở ra là đi cafe check-in sang chảnh, quần áo túi xách mua không tiếc tay. Cha nó cày cuốc đóng học cũng chẳng ai hay. Tội nghiệp con tôi!"',
            radar: [60, 80, 85, 50, 90, 20],
            radarExp: [
                { name: 'Gaslighting', score: 60, exp: 'Đánh tráo khái niệm giữa việc hưởng thụ cá nhân chính đáng với trách nhiệm nuôi con.', def: 'Đánh tráo khái niệm.', rec: 'Bỏ ngoài tai.' },
                { name: 'Guilt Tripping', score: 80, exp: 'Đánh vào lòng trắc ẩn của cư dân mạng, tạo áp lực dư luận lên chị Hạnh.', def: 'Thu hút đám đông tấn công niềm tin nạn nhân.', rec: 'Nín lặng không đọc comment.'},
                { name: 'Victim Playing', score: 85, exp: 'Khắc họa bản thân như một người cha "cày cuốc đóng học" thầm lặng bất hạnh.', def: 'Chơi tráo bài đóng vai nạn nhân khốn khổ (Cry-bully).', rec: 'Ngăn chặn tương tác chéo.' },
                { name: 'Financial Abuse', score: 50, exp: 'Ngầm ý rêu rao rằng chị dùng tiền của anh ta để thỏa mãn cá nhân.', def: 'Quyền lực tài chính thao túng dư luận.', rec: 'Độc lập tài chính.'},
                { name: 'Boundary Cross', score: 90, exp: 'Xâm phạm nghiêm trọng ranh giới công cộng, mang việc riêng tư ra hạ nhục.', def: 'Bôi nhọ ranh giới riêng tư public (Smear Campaign).', rec: 'Chặn (Block)/ Ẩn theo dõi nền tảng.'},
                { name: 'Double Bind', score: 20, exp: 'Yếu tố gián tiếp.', def: 'Bẫy nòng đôi.', rec: 'Tránh rơi vào.'}
            ],
            intent: 'Chiến dịch Bôi Nhọ (Smear Campaign / Flying Monkeys). Kích động người ngoài nhảy vào đánh giá để cô lập nạn nhân (Triangulation). Mục đích là chọc tức. Nếu chị Hạnh tức giận nhảy vào thanh minh, anh ta sẽ có cớ bảo "có tật giật mình".',
            action: '<b>[KHÔNG TRẢ LỜI/ KHÔNG TƯƠNG TÁC]</b> "Bất cứ phản ứng nào trên MXH cũng là rơi vào bẫy cung cấp năng lượng ái kỷ. Cíu Cíu khuyến nghị: Ẩn theo dõi, không đọc comment, dành năng lượng đó đi dạo với con."'
        }
    };

    const prompts = {
        'greyrock': {
            title: 'Đá Xám (Grey Rock)', status: 'ACTIVE',
            role: 'Bạn là Trợ lý Tâm lý học chống Thao Túng. Nhiệm vụ của bạn là bảo vệ Chị Hạnh bằng phương pháp "Hòn Đá Xám". Bạn phải tạo ra các lời lẽ lạnh nhạt nhất, nhàm chán nhất, không mang cảm xúc vui buồn tức giận để cắt đứt Nguồn Cung Ái Kỷ.',
            reason: '1. Cô lập những câu chứa Mệnh lệnh hoặc Hăm dọa.\n2. Phân loại thao túng (Gaslighting, Double Bind, Đóng vai nạn nhân...).\n3. Bóc tách và vứt bỏ toàn bộ từ Cảm Xúc.\n4. Soạn Câu khẳng định Ngắn gọn dưới 20 chữ.'
        },
        'dearman': {
            title: 'Ranh Giới Chuẩn (DEAR MAN)', status: 'INACTIVE',
            role: 'Bạn là Chuyên gia thiết lập Ranh Giới. Nhiệm vụ tư vấn giao tiếp dựa trên D.E.A.R M.A.N: Mô tả thực tế rõ ràng, Yêu cầu dứt khoát điều mình cần, Không công kích cá nhân.',
            reason: '1. Liệt kê các Sự Kiện (Facts) khách quan.\n2. Nhận diện Ranh giới (Boundary) bị xâm phạm.\n3. Thiết lập câu từ chối/yêu cầu cứng rắn nhưng ôn hòa.\n4. Nhắc nhở rủi ro.'
        },
        'hardcore': {
            title: 'Bóc Mẽ (Call-out / Hardcore)', status: 'INACTIVE',
            role: 'Bạn là Vệ sĩ Ngôn từ. Đánh đòn tâm lý phòng thủ cực mạnh (Shock factor) vào trung tâm cái tôi ảo tưởng của Gã thao túng. Phá vỡ lớp màng phòng vệ.',
            reason: '1. Xác định ngay thuật ngữ tâm lý tà đạo.\n2. Lập luận: "Việc anh làm A thực chất là che đậy B".\n3. Vạch mặt ý đồ và từ chối hợp tác dứt khoát.'
        }
    };

    window.selectIncident = function(element, id) {
        document.querySelectorAll('#tab-behavior .m-item').forEach(el => el.classList.remove('active'));
        if(element) element.classList.add('active');
        
        window.currentIncidentId = id || 'case14';
        const data = incidents[window.currentIncidentId];
        
        const titleEl = document.getElementById('inc-title');
        const evdEl = document.getElementById('inc-evidence');
        const intentEl = document.getElementById('inc-intent');
        const actionEl = document.getElementById('inc-action');
        
        if (titleEl) titleEl.innerHTML = 'Hồ Sơ Vụ Việc: ' + data.title;
        if (evdEl) evdEl.innerText = data.evidence;
        if (intentEl) intentEl.innerHTML = '<p>' + data.intent + '</p>';
        if (actionEl) actionEl.innerHTML = data.action;

        // Reset the Radar click tooltip
        const radarExpBox = document.getElementById('radar-metric-detail');
        if(radarExpBox) radarExpBox.innerHTML = '<div class="text-muted text-sm text-center italic mt-2"><i class="fa-solid fa-hand-pointer"></i> Nhấp vào các điểm trên Radar hoặc các thẻ chỉ tiêu bên trên để xem phân tích chi tiết.</div>';

        // Re-render chart for effect with Interactive OnClick
        renderPsychoChart(data.radar, data.radarExp);

        // Reset Feedback loop UI
        document.getElementById('fb-input-area').style.display = 'block';
        document.getElementById('actual-outcome').value = '';
        const insightResult = document.getElementById('ai-insight-result');
        if(insightResult) insightResult.classList.add('hidden');
        document.querySelector('.feedback-loop-container .btn-primary').innerHTML = '<i class="fa-solid fa-microchip"></i> Đưa vào máy học AI';
        document.querySelector('.feedback-loop-container .btn-primary').disabled = false;
    };

    window.selectPrompt = function(element, id) {
        document.querySelectorAll('#tab-prompts .m-item').forEach(el => el.classList.remove('active'));
        if(element) element.classList.add('active');
        
        const data = prompts[id] || prompts['greyrock'];
        
        const titleEl = document.getElementById('prmt-title');
        const roleEl = document.getElementById('prmt-role');
        const reasonEl = document.getElementById('prmt-reason');
        const statusBadge = document.getElementById('prmt-status');
        
        if (titleEl) titleEl.innerHTML = 'Cấu Hình Lá Chắn: <span class="text-primary">' + data.title + '</span>';
        if (roleEl) roleEl.value = data.role;
        if (reasonEl) reasonEl.value = data.reason;
        
        if(statusBadge) {
            if(data.status === 'ACTIVE') {
                 statusBadge.innerHTML = '<span class="tag-green float-right"><i class="fa-solid fa-play"></i> Đang là Chế độ Hệ thống</span>';
            } else {
                 statusBadge.innerHTML = `<button class="btn-primary btn-sm float-right" onclick="setSystemPrompt('${id}')"><i class="fa-solid fa-check"></i> Chọn làm Chế độ Tư Vấn</button>`;
            }
        }
    };

    window.setSystemPrompt = function(id) {
        // Turn off all other ACTIVE
        Object.keys(prompts).forEach(key => prompts[key].status = 'INACTIVE');
        prompts[id].status = 'ACTIVE';
        
        // Hide all active badges on list
        document.querySelectorAll('.active-tag').forEach(tag => {
            tag.style.display = 'none';
        });
        
        // Show active badge for selected
        const selectedListEl = document.querySelector(`#list-prmt-${id} .active-tag`);
        if(selectedListEl) selectedListEl.style.display = 'inline-block';
        
        // Rerender view
        selectPrompt(null, id);
        alert(`Đã áp dụng chế độ ${prompts[id].title} làm tư duy hệ thống mặc định cho Bot Cíu Cíu!`);
    };

    window.createNewPrompt = function() {
        document.querySelectorAll('#tab-prompts .m-item').forEach(el => el.classList.remove('active'));
        
        document.getElementById('prmt-title').innerHTML = 'Cấu Hình Lá Chắn: <span class="text-primary">Blank Template</span>';
        document.getElementById('prmt-role').value = '';
        document.getElementById('prmt-role').placeholder = 'Nhập Vai trò Tâm lý học cho Bot...';
        document.getElementById('prmt-reason').value = '';
        document.getElementById('prmt-reason').placeholder = 'Nhập hướng dẫn tư duy từng bước...';
        
        document.getElementById('prmt-status').innerHTML = '<span class="tag-orange float-right">Bản Nháp (Draft)</span>';
    };

    window.scrollToAdminLink = function() {
        const target = document.getElementById('target-admin-msg');
        if(target) {
            target.classList.add('blink-highlight');
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => target.classList.remove('blink-highlight'), 1500);
        }
    };



    window.submitAILearning = function() {
        const input = document.getElementById('actual-outcome').value;
        if(input.trim().length === 0) return alert('Vui lòng nhập kết quả trước khi cho máy học.');
        
        const btn = document.querySelector('.feedback-loop-container .btn-primary');
        btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Đang nạp dữ liệu...';
        btn.disabled = true;

        setTimeout(() => {
            document.getElementById('fb-input-area').style.display = 'none';
            document.getElementById('ai-insight-result').classList.remove('hidden');
        }, 1500);
    };

    // --- 7. ChartJS Render (Light Theme) Interactive ---
    function renderPsychoChart(customData, radarExpData) {
        const ctx = document.getElementById('adminRadarChart');
        if (!ctx) return;
        
        if(window.currentChart) window.currentChart.destroy();

        const dataArray = customData || [80, 50, 95, 20, 70, 85];
        const labels = ['Gaslighting', 'Guilt Tripping', 'Victim Playing', 'Financial Abuse', 'Boundary Cross', 'Double Bind'];

        // Cập nhật Modal Mở (Click)
        window.openMetricModal = function(index, dataExp) {
            if (dataExp && dataExp[index]) {
                const detail = dataExp[index];
                document.getElementById('modal-title').innerText = detail.name;
                document.getElementById('modal-score').innerText = detail.score + '/100';
                document.getElementById('modal-def').innerText = detail.def || 'Đang chờ phân tích...';
                document.getElementById('modal-exp').innerText = detail.exp;
                document.getElementById('modal-rec').innerText = detail.rec || 'Sử dụng Hòn Đá Xám (Grey Rock)';
                
                document.getElementById('metric-modal').style.display = 'flex';
                setTimeout(() => document.getElementById('metric-modal').classList.add('show'), 10);
            }
        };

        // Xem lướt (Hover)
        window.showMetricDetail = function(index, dataExp) {
            const box = document.getElementById('radar-metric-detail');
            if (box && dataExp && dataExp[index]) {
                const detail = dataExp[index];
                
                // Highlight the active pill
                document.querySelectorAll('.metric-pill').forEach((el, i) => {
                    if(i === index) {
                        el.style.backgroundColor = 'var(--z-blue)';
                        el.style.color = 'white';
                    } else {
                        el.style.backgroundColor = 'transparent';
                        el.style.color = 'var(--text-main)';
                    }
                });

                box.innerHTML = `
                    <div class="sci-tooltip slide-in mt-2" style="border-left: 4px solid var(--z-blue); animation: none !important;">
                        <h5 class="text-primary mb-2" style="font-size: 15px"><i class="fa-solid fa-magnifying-glass-chart"></i> Phân tích Thông số: ${detail.name} (Điểm: ${detail.score}/100)</h5>
                        <p style="font-size: 14px; line-height: 1.6;">${detail.exp}</p>
                    </div>
                `;
            }
        };

        // Reset Box on Mouse Leave
        window.resetMetricDetail = function() {
            const box = document.getElementById('radar-metric-detail');
            if (box) {
                document.querySelectorAll('.metric-pill').forEach(el => {
                    el.style.backgroundColor = 'transparent';
                    el.style.color = 'var(--text-main)';
                });
                box.innerHTML = '<div class="text-muted text-sm text-center italic mt-2"><i class="fa-solid fa-hand-pointer"></i> Di chuột vào các thẻ để xem nhanh, Nhấp chuột để mở Phân tích siêu chi tiết.</div>';
            }
        };

        // Inject the interactive Pill buttons below the chart
        const pillContainer = document.getElementById('radar-metric-list');
        if(pillContainer && radarExpData) {
            pillContainer.innerHTML = '';
            radarExpData.forEach((item, index) => {
                const btn = document.createElement('button');
                btn.className = 'btn-outline btn-sm m-1 metric-pill';
                btn.style.borderRadius = '20px';
                btn.innerHTML = `${item.name} <span class="tag-red" style="font-size:10px; margin-left:4px">${item.score}</span>`;
                
                // Binding Events
                btn.onmouseenter = () => showMetricDetail(index, radarExpData);
                btn.onclick = () => openMetricModal(index, radarExpData);
                
                pillContainer.appendChild(btn);
            });
            // Reset box when mouse leaves container
            pillContainer.onmouseleave = resetMetricDetail;
        }

        window.currentChart = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mức độ',
                    data: dataArray,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue light
                    borderColor: '#3b82f6',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#3b82f6',
                    pointHoverBackgroundColor: '#ef4444',
                    pointHoverBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 8,
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        showMetricDetail(index, radarExpData);
                    }
                },
                scales: {
                    r: { 
                        angleLines: { color: 'rgba(0,0,0,0.1)' }, 
                        grid: { color: 'rgba(0,0,0,0.1)' }, 
                        pointLabels: { color: '#475569', font: { size: 12, family: 'Inter', weight: 600 } }, 
                        ticks: { display: false, min: 0, max: 100 } 
                    }
                },
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return ' Mức độ: ' + context.raw + '/100'; }
                        }
                    } 
                }
            }
        });
    }

    // --- 8. Native Dropdowns & Task Details ---
    const monthDb = {
        '03/2026': {
            token: '142,500', cost: '24,500đ',
            history: [
                { date: '29/03/2026', title: 'Bẫy ngày thăm con', sub: 'Chi tiết: Xử lý ngữ nghĩa Tiếng Việt', model: 'Claude 3.5 Sonnet', tk: '4,200', unit: '110,000đ', total: '~550đ' },
                { date: '29/03/2026', title: 'Phản hồi Option B+', sub: 'Chi tiết: Lọc cảm xúc & định dạng ranh giới', model: 'GPT-4o', tk: '1,800', unit: '125,000đ', total: '~400đ' },
                { date: '28/03/2026', title: 'Tóm tắt cuộc gọi thoại 15 phút', sub: '', model: 'Gemini 1.5 Pro', tk: '12,500', unit: '85,000đ', total: '~1,200đ' }
            ]
        },
        '02/2026': {
            token: '89,200', cost: '15,300đ',
            history: [
                { date: '14/02/2026', title: 'Gỡ rối bạo hành tài chính', sub: 'Chi tiết: Soạn SMS đòi tiền học phí', model: 'Claude 3.5 Sonnet', tk: '3,100', unit: '110,000đ', total: '~420đ' },
                { date: '02/02/2026', title: 'Phân tích bài bóc phốt FB', sub: 'Chi tiết: Quét hành vi bôi nhọ danh dự', model: 'GPT-4o', tk: '5,600', unit: '125,000đ', total: '~950đ' }
            ]
        }
    };

    const donationDb = {
        '03/2026': [
            { date: '15/03/2026', sender: 'Chị Hạnh', amount: '+ 50,000đ' },
            { date: '02/03/2026', sender: 'Chị Hạnh', amount: '+ 100,000đ' }
        ],
        '02/2026': [
            { date: '14/02/2026', sender: 'Chị Thục', amount: '+ 50,000đ' }
        ]
    };

    window.toggleDropdown = function(e, id) {
        e.stopPropagation();
        document.querySelectorAll('.native-dropdown-menu').forEach(menu => {
            if (menu.id !== id) menu.style.display = 'none';
        });
        const menu = document.getElementById(id);
        menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'flex' : 'none';
    };

    window.addEventListener('click', () => {
        document.querySelectorAll('.native-dropdown-menu').forEach(menu => menu.style.display = 'none');
    });

    window.selectBillingMonth = function(month, element) {
        document.getElementById('billingMonthLabel').innerText = 'Tháng ' + month;
        document.querySelectorAll('#billingMenu .drop-item').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
        
        const data = monthDb[month];
        if (!data) return;
        
        const statBoxes = document.querySelectorAll('#tab-billing .stat-box div:nth-child(2)');
        if(statBoxes.length >= 2) {
            statBoxes[0].innerText = data.token;
            statBoxes[1].innerText = data.cost;
        }
        
        const tbody = document.getElementById('billing-table-body');
        tbody.innerHTML = data.history.map(item => `
            <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'" onclick="openTaskDetail('${item.title}', '${item.model}', '${item.tk}', '${item.unit}', '${item.total}')">
                <td style="padding: 12px;">${item.date}</td>
                <td style="padding: 12px; font-weight:500;">${item.title}<br><span class="text-muted" style="font-weight:400; font-size:12px;">${item.sub}</span></td>
                <td style="padding: 12px;"><span style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${item.model}</span></td>
                <td style="padding: 12px; color: #64748b; text-align: right;">${item.tk}</td>
                <td style="padding: 12px; color: #64748b; text-align: right; font-size: 12px;">${item.unit}</td>
                <td style="padding: 12px; font-weight: bold; color: #15803d; text-align: right;">${item.total}</td>
            </tr>
        `).join('');
    };

    window.selectDonationMonth = function(month, element) {
        document.getElementById('donationMonthLabel').innerText = 'Tháng ' + month;
        document.querySelectorAll('#donationMenu .drop-item').forEach(el => el.classList.remove('active'));
        element.classList.add('active');

        const data = donationDb[month];
        if (!data) return;

        const tbody = document.getElementById('donation-table-body');
        tbody.innerHTML = data.map(item => `
            <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 8px 0; color: #57534e;">${item.date}</td>
                <td style="padding: 8px 0; color: #44403c; font-weight: 500;">${item.sender}</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #166534;">${item.amount}</td>
            </tr>
        `).join('');
        
        let t = 0;
        data.forEach(x => t += parseInt(x.amount.replace(/[^0-9]/g, '')));
        const totalText = document.querySelector('.d-card .text-right.mt-2 strong');
        if(totalText) {
            totalText.innerText = new Intl.NumberFormat('vi-VN').format(t) + 'đ 💖';
        }
    };

    const taskLogsDb = {
        'Bẫy ngày thăm con': '"Đấy! Lần nào tôi có thiện chí bù đắp cho con thì cô cũng kiếm cớ nọ kia để từ chối! Lúc nào lên mạng cũng than khóc, nhưng khi tôi giang tay gánh vác hộ thì cô lại tìm cách cực đoan cản trở, tước đoạt quyền làm cha của tôi. Cứ cái đà này tôi sẽ đưa ra tòa!"',
        'Phản hồi Option B+': '"Chào anh, tôi luôn ghi nhận thiện chí của anh. Tuy nhiên, lịch đón con thứ 7 đã được tự nguyện thống nhất để đảm bảo ổn định tâm lý cho con. Nếu anh không thể thu xếp, tuần này anh có thể dừng đón. Mọi sự thay đổi lịch đột xuất sẽ không được đáp ứng."',
        'Tóm tắt cuộc gọi thoại 15 phút': 'Phân tích file Audio. Trích xuất Action items và thái độ. Trích ly các đoạn có chứa Cảm xúc hay Đe dọa. Xác nhận có 3 từ lăng mạ.',
        'Gỡ rối bạo hành tài chính': 'Tôi sẽ tự thu xếp học phí cho con. Tuy nhiên do đây là trách nhiệm tài chính đã được thống nhất sau ly hôn, việc anh chậm trễ đã được tôi ghi nhận. Vui lòng thanh toán vào tài khoản trước ngày 15.',
        'Phân tích bài bóc phốt FB': 'Nhiều người làm mẹ đơn thân lạ lắm, kêu than nghèo khổ nhưng hở ra là đi cafe check-in sang chảnh...'
    };

    window.openTaskDetail = function(title, model, tk, unit, total) {
        document.getElementById('td-title').innerText = title;
        document.getElementById('td-model').innerText = model;
        document.getElementById('td-token').innerText = tk;
        document.getElementById('td-unit').innerText = unit;
        document.getElementById('td-cost').innerText = total;
        
        let evidence = taskLogsDb[title.trim()] || "Tác vụ hệ thống ẩn (System Action). Không lưu trữ văn bản trên DB.";
        document.getElementById('td-evidence').innerText = evidence;
        document.getElementById('td-action').innerText = "Hệ thống đã phân tích văn bản thô, nhận diện ngôn ngữ thao túng và bóc tách dữ liệu tốn " + tk + " token.";

        const modal = document.getElementById('task-detail-modal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    };

    window.closeTaskDetail = function() {
        const modal = document.getElementById('task-detail-modal');
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 200);
    };

});
