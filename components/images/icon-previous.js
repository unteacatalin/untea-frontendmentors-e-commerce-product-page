function IconPrevious({ color }) {
  return (
    <svg width='12' height='18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 1 3 9l8 8'
        stroke={color || '#1D2026'}
        stroke-width='3'
        fill='none'
        fill-rule='evenodd'
      />
    </svg>
  );
}

export default IconPrevious;
