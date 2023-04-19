export function parseLyrics(lyricsString) {
    let lyricsArr = lyricsString.split("\n")
    const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
    const lyrics = []
    for (const iterator of lyricsArr) {
        const timeResult = timeRegExp.exec(iterator)
        if (!timeResult) continue
        const m = timeResult[1] * 60 * 1000
        const s = timeResult[2] * 1000
        const ms = timeResult[3].length == 2 ? timeResult[3] * 10 : timeResult[3] * 1
        const time = m + s + ms
        const lrc = {
            time,
            text: iterator.replace(timeResult[0], '')
        }
        lyrics.push(lrc)
    }
    
    return lyrics
}