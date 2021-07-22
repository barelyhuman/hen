function Header({ ...props }) {
  return (
    <>
      <header className="p-2">
        <div className="flex">
          <div>
            <h3 className="m-0 p-0">Hen</h3>
            <p className="m-0 p-0">
              <small>ESM Based React Component Playground</small>
            </p>
            <p className="m-0 p-0 text-secondary">
              <small>
                2021 - present &copy;{" "}
                <a className="link-underline" href="https://reaper.im">
                  Reaper
                </a>
              </small>
            </p>
          </div>
          <div className="ml-auto flex align-center">
            <a
              className="p-1 bg-lighter ml-1 icon rounded-sm"
              href="https://barelyhuman.dev/donate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </a>

            <a
              href="https://reaper.im"
              className="p-1 bg-lighter ml-1 icon rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/barelyhuman"
              className="p-1 bg-lighter ml-1 icon rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
