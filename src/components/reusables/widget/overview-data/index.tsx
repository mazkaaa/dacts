import React from "react";

type OverviewDataProps = {
  overviewTitle: string;
  data: {
    title: string;
    value: string;
    desc?: string;
  }[];
  onClose?: () => void;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  isExistInCart?: boolean;
};
const OverviewData = (props: OverviewDataProps) => {
  return (
    <section className="absolute right-3 top-3 z-50 rounded-lg bg-base-300 drop-shadow-lg">
      <button
        onClick={() => {
          if (props.onClose) props.onClose();
        }}
        className="btn btn-circle btn-ghost btn-sm absolute right-1 top-1"
      >
        ✕
      </button>
      <div className="flex h-full flex-col justify-center space-y-4 p-6">
        <section className="flex flex-row items-center justify-between">
          <h4 className="text-base font-bold">{props.overviewTitle}</h4>
        </section>
        <div className="stats grid grid-flow-dense grid-cols-2 shadow">
          {props.data.map((item, index) => (
            <div className="stat" key={index}>
              <div className="stat-title capitalize">{item.title}</div>
              <div className="stat-value">{item.value}</div>
              {item.desc ? <div className="stat-desc">{item.desc}</div> : null}
            </div>
          ))}
        </div>
        {props.onAddToCart ? (
          !props.isExistInCart ? (
            <button onClick={() => props.onAddToCart ? props.onAddToCart() : null} className="btn btn-outline btn-success">Add to cart</button>
          ) : (
            <button onClick={() => props.onRemoveFromCart ? props.onRemoveFromCart() : null} className="btn btn-outline btn-error">
              Remove from cart
            </button>
          )
        ) : null}
      </div>
    </section>
  );
};

export default OverviewData;
