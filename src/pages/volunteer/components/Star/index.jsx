import { View, Image } from "@tarojs/components";
import { useCallback, useEffect, useState } from "react";
import "./index.scss";

import StarSel from "../../image/star-sel.png";
import StarNor from "../../image/star-nor.png";

export default function ({
  icon = "",
  star = null,
  name = "",
  onChange = null,
}) {
  const [num, setNum] = useState(0);
  const stars = new Array(5).fill(false);
  const [mapStar, setStar] = useState(stars);
  const handleChange = useCallback(
    (n) => {
      const newStars = mapStar.map((m, i) => {
        return i <= n;
      });
      const nu = n + 1;
      setStar(newStars);
      setNum(nu);
      onChange && onChange(nu);
    },
    [mapStar, num]
  );
  useEffect(() => {
    if (star != null && !isNaN(star)) {
      handleChange(star - 1);
    }
  }, [star]);
  return (
    <View className="b-vol-star">
      <View className="b-vol-star-prepend">
        <Image className="b-vol-star-icon" mode="widthFix" src={icon}></Image>
        <View className="b-vol-star-name">{name}：</View>
      </View>
      <View className="b-vol-star-content">
        {mapStar.map((n, idx) => (
          <Image
            className="b-vol-star-img"
            src={n ? StarSel : StarNor}
            onClick={() => {
              handleChange(idx);
            }}
          ></Image>
        ))}
      </View>
      <View className="b-vol-star-num">{num}</View>
    </View>
  );
}
