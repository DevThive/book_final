const adminsidebar = document.getElementById('adminsidebar');

adminsidebar.innerHTML = `
<div
      class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style=" height: 100vh"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg class="bi pe-none me-2" width="40" height="32">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            href="adminsite.html"
            class="nav-link text-white"
            aria-current="page"
          >
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#home"></use>
            </svg>
            OwnerList
          </a>
        </li>
        <li>
          <a href="adminreview.html" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Comment
          </a>
        </li>
        <li>
          <a href="adminowner.html" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#table"></use>
            </svg>
            Owner
          </a>
        </li>
        
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            id="adminimg"
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong id="adminName"></strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
          <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li> -->
          <li>
            <a class="dropdown-item" href="index.html">Go Back Homepage</a>
          </li>
        </ul>
      </div>
    </div>
`;
