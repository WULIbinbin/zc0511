import Taro from "@tarojs/taro";

/**
 *
 * @param {*} num 需要减去的rpx高度
 * @returns
 */
export function getScrollViewHeight(num = 0) {
  const { windowHeight, windowWidth } = Taro.getSystemInfoSync();
  const topbarHeight = Math.floor(((windowWidth / 375) * num) / 2);
  console.log(topbarHeight);
  const scrollViewHeight = `${windowHeight - topbarHeight}PX`;
  return scrollViewHeight;
}

export function setEmptyKey(data = [], keyname = "-") {
  return [...data].map((item) => {
    Object.keys(item).forEach((key) => {
      if (item[key] === "" || item[key] === null) {
        item[key] = keyname;
      } else {
        item[key] = item[key];
      }
    });
    return item;
  });
}

export function debounce(fn, delay) {
  var timeout = null;
  return function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
