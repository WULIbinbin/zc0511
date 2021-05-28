import Taro from "@tarojs/taro";

/**
 *
 * @param {*} num 需要减去的rpx高度
 * @returns
 */
export function getScrollViewHeight(num = 0) {
  const { windowHeight, windowWidth } = Taro.getSystemInfoSync();
  const topbarHeight = Math.floor(((windowWidth / 375) * num) / 2);
  console.log(topbarHeight)
  const scrollViewHeight = `${windowHeight - topbarHeight}PX`;
  return scrollViewHeight;
}
