//*** Thiết lập nút trở về đầu trang
// Lấy đối tượng nút
var mybutton = document.getElementById("backToTopBtn");

// Biến để lưu vị trí cuộn cuối cùng
var lastScrollTop = 0;

// Khi người dùng cuộn trang
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Xuất hiện khi cuộn lên và không ở gần đầu trang
  if (currentScroll > 50 && currentScroll < lastScrollTop) {

    mybutton.classList.add("show");
  } else {

    mybutton.classList.remove("show");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

//*** Hàm cuộn lên đầu trang
function scrollToTopSmooth() {
  const startTime = performance.now();
  const startY = window.scrollY;
  const targetY = 0;
  const duration = 500; // Thời gian cuộn 

  function scrollStep(timestamp) {
    const currentTime = timestamp - startTime;
    if (currentTime >= duration) {
      window.scrollTo(0, targetY);
      return;
    }

    // Tính toán vị trí hiện tại dựa trên easing function (slow-in-out)
    const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const scrollY = startY + (targetY - startY) * ease(currentTime / duration);

    window.scrollTo(0, scrollY);
    requestAnimationFrame(scrollStep);
  }

  requestAnimationFrame(scrollStep);
}

//*** Hiệu ứng float in khi cuộn trang đến website
document.addEventListener("DOMContentLoaded", function () {
  const websiteBox = document.querySelector(".website-box");

  // Hàm kiểm tra xem top của phần tử có trong viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  // Hàm xử lý sự kiện scroll
  function handleScroll() {
    if (isInViewport(websiteBox)) {
      websiteBox.classList.add("visible");
    } else {
      websiteBox.classList.remove("visible");
    }
  }

  // Lắng nghe sự kiện scroll
  window.addEventListener("scroll", handleScroll);

  // Kiểm tra ngay khi tải trang (trường hợp phần tử đã ở trong viewport)
  handleScroll();
});

//*** Thiết lập loại lựa chọn bằng dạng nút

document.addEventListener('DOMContentLoaded', function () {
  const optionButtons = document.querySelectorAll('.options-container button');

  optionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const isSelected = this.getAttribute('data-selected') === 'true';
      this.setAttribute('data-selected', !isSelected);
      this.classList.toggle('selected', !isSelected); // Tùy chọn: toggle class 'selected' để thêm kiểu dáng
    });
  });
});

//*** Thiết lập nút dropdown
// Lấy các phần tử DOM
const dropdownButton = document.getElementById('dropdownButton');
const dropdownContent = document.getElementById('dropdownContent');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const arrowIcon = document.querySelector('.arrow-icon');

// Mở hoặc đóng dropdown khi nhấn vào nút
dropdownButton.addEventListener('click', () => {
  const isOpen = dropdownContent.style.display === 'block';
  dropdownContent.style.display = isOpen ? 'none' : 'block';

  // Đảo ngược biểu tượng tam giác
  arrowIcon.classList.toggle('open', !isOpen);


  // Focus vào ô tìm kiếm nếu dropdown được mở
  if (!isOpen) {
    searchInput.focus();
  }
});

// Xử lý khi chọn một quốc gia
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    const countryCode = item.getAttribute('data-country-code'); // Mã vùng điện thoại
    const flagClass = item.getAttribute('data-flag-class'); // Lớp CSS của cờ

    // Cập nhật nút dropdown
    const flagIcon = dropdownButton.querySelector('.flag-icon');
    flagIcon.className = ''; // Xóa lớp hiện tại
    flagIcon.classList.add('flag-icon', flagClass); // Thêm lớp mới

    // Đóng dropdown
    dropdownContent.style.display = 'none';

    // Reset biểu tượng tam giác về trạng thái ban đầu
    arrowIcon.classList.remove('open');

    // Lưu giá trị ngầm (mã vùng điện thoại)
    console.log(`Mã vùng đã chọn: ${countryCode}`);
  });
});

// Đóng dropdown khi click ra ngoài
document.addEventListener('click', (event) => {
  if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
    dropdownContent.style.display = 'none';

    // Reset biểu tượng tam giác về trạng thái ban đầu
    arrowIcon.classList.remove('open');
  }
});

//*** Xử lý tìm kiếm
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase(); // Giá trị tìm kiếm

  dropdownItems.forEach(item => {
    const text = item.textContent.toLowerCase(); // Nội dung của mục
    if (text.includes(query)) {
      item.classList.remove('hidden'); // Hiển thị mục
    } else {
      item.classList.add('hidden'); // Ẩn mục
    }
  });
});