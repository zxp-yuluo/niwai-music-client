import nwQuery from './niwai';

// ----------------- home -----------------
// 获取推荐歌单
export const getSheetList = () => nwQuery({
    url: '/sheets/recommend'
})
// 获取推荐歌曲
export const getSongList = () => nwQuery({
    url: '/songs/recommend'
})