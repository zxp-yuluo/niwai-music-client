import nwQuery from './niwai';

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

// 获取所有歌单
export const getAllSheetList = () => nwQuery({
    url: '/sheets'
})

// 根据id获取歌单信息
export const getSheetInfoById = id => nwQuery({
    url: '/sheets/id/' + id
})

// 根据id获取歌曲信息
export const getSongInfoById = id => nwQuery({
    url: '/songs/by/' + id
})