// script.js


// --- Hiệu ứng Cuộn Mượt cho các Liên kết Navbar ---
// Khi nhấp vào các liên kết như #about, #projects, trang sẽ cuộn mượt đến phần tương ứng
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ngăn chặn hành vi nhảy mặc định của trình duyệt
        e.preventDefault();

        // Lấy ID của phần (section) mục tiêu từ thuộc tính href
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

    });
});


// --- Hiệu ứng Gõ/Xóa/Lặp lại cho Dòng Chữ Subtitle ---
// Làm cho dòng chữ "Software Developer" xuất hiện như đang được gõ, sau đó xóa đi và lặp lại
const subtitleElement = document.querySelector('.subtitle');
const textToType = "Software Developer"; // Nội dung chữ bạn muốn có hiệu ứng

let charIndex = 0; // Index của ký tự hiện tại trong chuỗi textToType
let isDeleting = false; // Trạng thái: true nếu đang xóa, false nếu đang gõ
let typingSpeed = 100; // Tốc độ gõ (milliseconds/ký tự) - có thể điều chỉnh
let deletingSpeed = 50; // Tốc độ xóa (milliseconds/ký tự) - có thể điều chỉnh
let pauseAfterType = 1500; // Thời gian dừng sau khi gõ xong (milliseconds) - có thể điều chỉnh
let pauseAfterDelete = 500; // Thời gian dừng sau khi xóa xong (milliseconds) - có thể điều chỉnh

function typeWriter() {
    let currentText = subtitleElement.textContent;

    if (isDeleting) {
        // Xoá ký tự cuối cùng
        currentText = currentText.replace(/\u00A0/, ""); // Loại bỏ &nbsp; nếu có
        const newText = currentText.substring(0, currentText.length - 1);
        subtitleElement.textContent = newText === "" ? "\u00A0" : newText;
        charIndex--;
    } else {
        // Nếu đang gõ, thêm ký tự tiếp theo
        if (subtitleElement.textContent === "\u00A0") {
            subtitleElement.textContent = textToType.charAt(charIndex);
        } else {
            subtitleElement.textContent += textToType.charAt(charIndex);
        }
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === textToType.length) {
        speed = pauseAfterType;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        speed = pauseAfterDelete;
        isDeleting = false;
        subtitleElement.textContent = "\u00A0"; // Giữ không gian khi rỗng
    }

    setTimeout(typeWriter, speed);
}
// Xóa nội dung ban đầu của phần tử subtitle và bắt đầu hiệu ứng gõ
// Điều này đảm bảo hiệu ứng bắt đầu từ trạng thái trống
subtitleElement.textContent = '';
// Bắt đầu vòng lặp hiệu ứng sau thời gian dừng ban đầu (như sau khi xóa xong)
setTimeout(typeWriter, pauseAfterDelete);


// --- Đánh dấu Liên kết Active trên Navbar khi Cuộn Trang ---
// Highlight liên kết trong navbar tương ứng với phần (section) mà người dùng đang xem
const sections = document.querySelectorAll('main section[id]'); // Lấy tất cả các section có ID trong thẻ main
const navLinks = document.querySelectorAll('.navbar nav ul li a'); // Lấy tất cả các liên kết trong navbar
const navbarHeight = document.querySelector('.navbar').offsetHeight; // Lấy chiều cao navbar (có thể thay đổi khi responsive)

// Cấu hình Intersection Observer
// Observer sẽ kích hoạt khi ranh giới trên của một section đi qua một đường ảo
// Đường ảo này được đặt ngay dưới navbar (tính bằng -navbarHeight từ đỉnh viewport)
const observerOptions = {
    root: null, // Quan sát tương đối với viewport (khung nhìn)
    rootMargin: `-${navbarHeight}px 0px 0px 0px`, // Điều chỉnh vùng quan sát: bớt đi chiều cao navbar từ đỉnh
    threshold: 0 // Kích hoạt ngay khi bất kỳ phần nào của section đi vào/ra vùng quan sát đã điều chỉnh
};

// Tạo một instance mới của Intersection Observer
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const targetId = entry.target.getAttribute('id'); // Lấy ID của section đang được quan sát
        const correspondingLink = document.querySelector(`.navbar nav ul li a[href="#${targetId}"]`); // Tìm liên kết trong navbar có href trùng với ID này

        if (entry.isIntersecting) {
            // Nếu section đang đi vào vùng quan sát (tức là phần đỉnh của nó vừa đi qua đường dưới navbar)
            // Loại bỏ class 'active' khỏi TẤT CẢ các liên kết trong navbar trước
            // Điều này đảm bảo chỉ có DUY NHẤT một liên kết được active tại một thời điểm (liên kết của section nằm trên cùng đang hiển thị dưới navbar)
            navLinks.forEach(link => link.classList.remove('active'));
            // Thêm class 'active' vào liên kết tương ứng với section hiện tại
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
        // Không cần 'else' để xóa active class khi section thoát ra khỏi vùng quan sát,
        // vì logic trong 'if' đã đảm bảo chỉ active section hiện tại và loại bỏ các cái khác.

        // Xử lý trường hợp đặc biệt cho liên kết 'Home'
        // Nếu không có section nào khác đang active (có thể là đang ở đầu trang)
        // và nếu cuộn trang đang ở gần đỉnh
        const anyLinkActive = Array.from(navLinks).some(link => link.classList.contains('active'));
        const scrollY = window.pageYOffset;
        const firstSectionTop = sections[0] ? sections[0].offsetTop - navbarHeight : 0; // Vị trí đỉnh section đầu tiên sau khi trừ navbar

        if (!anyLinkActive && scrollY <= firstSectionTop + 50) { // Nếu không có link nào active VÀ đang cuộn gần đỉnh (thêm 50px dung sai)
            const homeLink = document.querySelector('.navbar nav ul li a[href="#home"]');
            if (homeLink) {
                // Đảm bảo homeLink là active và các link khác không active
                navLinks.forEach(link => link.classList.remove('active'));
                homeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Bắt đầu quan sát từng section
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Xử lý ban đầu khi trang tải xong: kiểm tra và thiết lập active link cho phần hiện tại
// IntersectionObserver có thể chạy callback ngay khi khởi tạo nếu các phần tử đang trong view,
// nhưng việc gọi lại hàm kiểm tra thủ công đảm bảo đúng trạng thái ban đầu, đặc biệt là cho link Home.
const initialCheck = () => {
    const scrollY = window.pageYOffset;
    const firstSectionTop = sections[0] ? sections[0].offsetTop - navbarHeight : 0;

    // Nếu đang ở rất gần đỉnh trang, active link Home
    if (scrollY <= firstSectionTop + 50) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.navbar nav ul li a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    } else {
        // Nếu không ở đỉnh, IntersectionObserver sẽ xử lý active các link khác
        // Chỉ cần đảm bảo link Home không active nếu đang ở dưới
        const homeLink = document.querySelector('.navbar nav ul li a[href="#home"]');
        if (homeLink && homeLink.classList.contains('active')) {
            homeLink.classList.remove('active');
        }
    }
};

// Chạy kiểm tra ban đầu
initialCheck();
// Thêm lắng nghe sự kiện cuộn để kiểm tra lại (phòng khi Observer chưa kịp hoặc cho các trường hợp chuyển tiếp)
window.addEventListener('scroll', initialCheck);
// Thêm lắng nghe sự kiện resize để kiểm tra lại (chiều cao navbar hoặc vị trí section có thể thay đổi)
window.addEventListener('resize', initialCheck);

