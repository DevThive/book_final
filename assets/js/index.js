const header = document.getElementById('header');
const body = document.getElementById('card-list');
const maincard = document.getElementById('maincard');
const searchbox = document.getElementById('searchbox');

window.onload = function () {
  const cookieaccess = getCookie('accessToken');
  const cookierefresh = getCookie('refreshToken');

  if (cookieaccess && cookierefresh) {
    localStorage.setItem('accessToken', cookieaccess);
    localStorage.setItem('refreshToken', cookierefresh);
  }

  const token = localStorage.getItem('accessToken');

  if (!token) {
    loadHeader('home'); // load the home page by default
  } else {
    loadHeader('login');
  }

  mainBookcard();
};

//쿠키값을 로컬스토리지로 변경해주는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

//메인 추천도서 카드 부분
function mainBookcard() {
  mainCardSlide();
  axios
    .get('/books/main')
    .then(function (response) {
      const books = response.data;
      books.forEach((book) => {
        // console.log(book);
        body.innerHTML += `
        <div class="swiper-slide card">
        <div class="card-content">
          <div class="image">
            <img
              src="${book.book_image}"
              alt=""
            />
          </div>

          <div id="profession" class="name-profession">
            <span class="name">${book.title}</span>
            <span class="profession">${book.genre}</span>
          </div> 
        </div>
      </div>`;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

//슬라이드 스크립트 부분
function mainCardSlide() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var swiper = new Swiper('.mySwiper', {
    slidesPerView: 5,
    spaceBetween: 30,
    slidesPerGroup: 5,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function keyevent(event) {
  const search = await document.getElementById('search-box').value;
  if (event.key === 'Enter') {
    event.preventDefault();
  }

  console.log(search);
  if (search !== '') {
    maincard.style.display = 'none';
    searchresult(search, event);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function mainkeyup() {
  const search = await document.getElementById('search-box').value;

  if (search === '') {
    maincard.style.display = 'block';
    searchbox.innerHTML = '';
  }
}

// header 부분
function loadHeader(page) {
  let headerContent = '';

  if (page === 'home') {
    headerContent = `
    <div class="container" style="max-width: 3000px;">
          <div class="d-flex flex-wrap align-items-center justify-content-center">
            <ul class="nav col col-lg-auto me-lg-5 mb-2 mb-md-0 text-center">
              <li><a href="#" class="nav-link px-2 text-white">HOME</a></li>
              <li><a href="#" class="nav-link px-2 text-white">INTRODUCE</a></li>
            </ul>
            <form class="col-12 col-md-6 d-flex mb-3 mb-lg-0" role="search">
              <input  type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form>
            <ul class="nav col col-lg-auto me-lg-5 mb-2 mb-md-0 text-center">
              <li><a href="login&signup.html" class="nav-link px-3 text-white">LOGIN</a></li>
            </ul>
          </div>
        </div>
    `;
    // 로그인 시 로그인 회원 정보 출력
  } else if (page === 'login') {
    headerContent = `
    <div class="container" style="max-width: 3000px">
        <div class="d-flex flex-wrap align-items-center justify-content-center">
          <ul class="nav col col-lg-auto me-lg-5 mb-2 mb-md-0 text-center">
            <li><a href="#" class="nav-link px-2 text-white">HOME</a></li>
            <li><a href="#" class="nav-link px-2 text-white">INTRODUCE</a></li>
          </ul>
          <form class="col-12 col-md-6 d-flex mb-3 mb-lg-0" role="search">
            <input
              type="search"
              onkeypress="keyevent(event)"
              id="search-box"
              onkeyup="mainkeyup()"
              class="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <div
            class="col-1 dropdown text-end justify-content-lg-end justify-content-end"
          >
            <a
              href="#"
              class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              />
            </a>
            <ul
              class="dropdown-menu text-small justify-content-end text-end text-center"
            >
              <li><a class="dropdown-item" href="#">내 정보</a></li>
              <li><a class="dropdown-item" href="#">위시리스트</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a onclick="logout()" class="dropdown-item">로그아웃</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  header.innerHTML = headerContent;
}

async function searchresult(search) {
  // searchbox.innerHTML = ``;
  console.log(search);
  await axios
    .get(`/books/search?booktitle=${search}`)
    .then(function (response) {
      console.log(response.data[0]);
      const books = response.data;
      const length = response.data.length;
      console.log(length);

      for (let i = 0; i <= length; i++) {
        if (books[i].title == undefined) {
          break;
        }
        console.log(response.data[i].title);
      }
      // searchbox.innerHTML = 'test';
    })
    .catch(function (error) {
      console.log(error);
    });
}
