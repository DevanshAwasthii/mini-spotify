# Spotify Player Clone

A simple Spotify-inspired music player interface built with HTML, CSS, and JavaScript.

## Recent changes

- Connected all five song rows to their matching audio files; selecting a row updates the now-playing title and supports seeking, play/pause, and previous/next controls.
- Added matching vertical side panels on both sides of the square song-list panel.
- Standardized song-list cover art to 40 × 40 pixels with a centered crop and circular shape.
- Fixed the now-playing animation: `gif.mp4` is an MP4 video, so it is displayed with a video element instead of an image. It autoplays silently and loops.
- Reworked the bottom player bar into a three-row grid. The progress bar sits above the playback controls, and the animation is centered directly below the controls without stretching the bar.
- Kept the player bar at a fixed height so it stays separate from the main content container.

## Run locally

Open `index.html` in a web browser. Keep the media and image files in the same folder as the HTML file.
