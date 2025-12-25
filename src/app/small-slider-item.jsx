import Image from "next/image";

export function SmallSliderItem({ item, goToSlide, idx, currentSlide }) {
  const isActiveSlide = currentSlide === idx;

  return (
    <li className="flex bg-fuchsia-400">
      <button
        type="button"
        onClick={() => {
          goToSlide(idx);
        }}
        aria-label={`Go to slide ${idx + 1}`}
        aria-current={isActiveSlide ? "true" : undefined}
        aria-controls="product-slider"
        className="relative overflow-hidden size-20 cursor-pointer"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="240px"
          className="object-contain"
        />
      </button>
    </li>
  );
}
