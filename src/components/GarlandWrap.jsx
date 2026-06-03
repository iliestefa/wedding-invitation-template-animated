export default function GarlandWrap() {
  return (
    <div className="garland-wrap" aria-hidden="true">
      <svg className="garland gl" viewBox="0 0 200 150">
        <use href="#garland" />
      </svg>
      <svg className="garland gr" viewBox="0 0 200 150">
        <use href="#garland" />
      </svg>
    </div>
  );
}
