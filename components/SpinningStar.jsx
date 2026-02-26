export default function SpinningStar({ className = '', style = {} }) {
  return (
    <span className={`spinning-star ${className}`} style={style}>
      ★
    </span>
  );
}
