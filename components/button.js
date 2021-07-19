import cn from "clsx";

export const Button = ({ children, className, secondary, ...props }) => {
  const classList = cn(className, { secondary });

  return (
    <>
      <button className={classList} {...props}>
        {children}
      </button>
      <style jsx>{`
        button {
          background: #000;
          color: #fff;
          border: 2px solid rgba(12, 12, 13, 0.1);
          border-radius: 4px;
          height: 32px;
          padding: 0 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
        }

        button:hover {
          border-color: #000;
          outline: #000;
          color: #000;
          background: #fff;
          cursor: pointer;
        }

        button.secondary {
          background: var(--bg-lighter);
          color: var(--fg);
          border: 1px solid var(--bg-lighter);
        }

        button.secondary:hover {
          border: 1px solid var(--bg-light);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
};
