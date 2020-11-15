import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height={256} viewBox="0 0 256 256" width={256} xmlns="http://www.w3.org/2000/svg" {...props}>
      <filter
        id="prefix__a"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height={200}
        width={200}
        x={28}
        y={32}
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <path d="M0 0h256v256H0z" fill="#fafafa" />
      <g filter="url(#prefix__a)">
        <path
          clipRule="evenodd"
          d="M48 224s-16 0-16-16 16-64 96-64 96 48 96 64-16 16-16 16zm80-96a48 48 0 100-96 48 48 0 000 96z"
          fill="#dcdcdc"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
