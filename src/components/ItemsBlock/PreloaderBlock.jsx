import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
<ContentLoader
    className="items-block"
    speed={2}
    width={276}
    height={417}
    viewBox="0 0 276 417"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
>
    <rect x="0" y="331" rx="6" ry="6" width="280" height="88" />
    <circle cx="137" cy="124" r="124" />
    <rect x="0" y="262" rx="0" ry="0" width="275" height="44" />
</ContentLoader>
)

export default MyLoader