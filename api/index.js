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

// 添加歌单
export const addSongSheet = data => nwQuery({
    url: '/sheets',
    method: 'POST',
    data
})

// 删除图片
export const deleteImage = name => nwQuery({
    method: 'DELETE',
    url: '/upload/picture/' + name
})