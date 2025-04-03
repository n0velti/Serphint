import React, {useRef, useState} from 'react';
import Video, {
    type VideoRef,
    type AudioTrack,
    type TextTrack,
    type VideoTrack,
    type SelectedTrack,
    type SelectedVideoTrack,
    SelectedVideoTrackType,
    type OnAudioTracksData,
    type OnTextTracksData,
    type OnLoadData,
    type OnVideoTracksData,
    type OnProgressData,
    type OnSeekData,
    type OnBufferData,
    type OnTextTrackDataChangedData,
    type OnVideoAspectRatioData,
    type OnVideoErrorData,
    type OnAudioFocusChangedData,
    type OnPlaybackRateChangeData,
    type OnPlaybackStateChangedData,    
    type OnBandwidthUpdateData,

} from 'react-native-video';
import { ProductData } from '../../../types/types';
import { StyleSheet, Text, View } from 'react-native';
import {HintOverlay} from './HintOverlay';

type VideoItemProps = {
    currentHint: ProductData;
    ITEM_HEIGHT: number;
};


function VideoItem({currentHint, ITEM_HEIGHT}: VideoItemProps) {

    const videoRef = useRef<VideoRef>(null);



    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [videoSize, setVideoSize] = useState({videoWidth: 0, videoHeight: 0});


    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);

    const [paused, setPaused] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);
    const [textTracks, setTextTracks] = useState<TextTrack[]>([]);
    const [videoTracks, setVideoTracks] = useState<VideoTrack[]>([]);

    const [selectedAudioTrack, setSelectedAudioTrack] = useState<
      SelectedTrack | undefined
    >(undefined);
    const [selectedTextTrack, setSelectedTextTrack] = useState<
      SelectedTrack | undefined
    >(undefined);
    const [selectedVideoTrack, setSelectedVideoTrack] =
      useState<SelectedVideoTrack>({
        type: SelectedVideoTrackType.AUTO,
      });


      const onAudioTracks = (data: OnAudioTracksData) => {
        console.log('onAudioTracks', data);
        // const selectedTrack = data.audioTracks?.find((x: AudioTrack) => {
        //   return x.selected;
        // });
        // let value;
        // if (audioTracksSelectionBy === SelectedTrackType.INDEX) {
        //   value = selectedTrack?.index;
        // } else if (audioTracksSelectionBy === SelectedTrackType.LANGUAGE) {
        //   value = selectedTrack?.language;
        // } else if (audioTracksSelectionBy === SelectedTrackType.TITLE) {
        //   value = selectedTrack?.title;
        // }
        setAudioTracks(data.audioTracks);
        // setSelectedAudioTrack({
        //   type: audioTracksSelectionBy,
        //   value: SelectedTrackType.INDEX,
        // });
      };
    
      const onVideoTracks = (data: OnVideoTracksData) => {
        console.log('onVideoTracks', data.videoTracks);
        setVideoTracks(data.videoTracks);
      };
    
      const onTextTracks = (data: OnTextTracksData) => {
        const selectedTrack = data.textTracks?.find((x: TextTrack) => {
          return x?.selected;
        });
    
        setTextTracks(data.textTracks);
        // let value;
        // if (textTracksSelectionBy === SelectedTrackType.INDEX) {
        //   value = selectedTrack?.index;
        // } else if (textTracksSelectionBy === SelectedTrackType.LANGUAGE) {
        //   value = selectedTrack?.language;
        // } else if (textTracksSelectionBy === SelectedTrackType.TITLE) {
        //   value = selectedTrack?.title;
        // }
        // setSelectedTextTrack({
        //   type: textTracksSelectionBy,
        //   value: value,
        // });
      };
    
      const onLoad = (data: OnLoadData) => {
        setDuration(data.duration);
        onAudioTracks(data);
        onTextTracks(data);
        onVideoTracks(data);
      };

      const onProgress = (data: OnProgressData) => {
        setCurrentTime(data.currentTime);
      };
    
      const onSeek = (data: OnSeekData) => {
        setCurrentTime(data.currentTime);
        setIsSeeking(false);
      };
    
      const onVideoLoadStart = () => {
        console.log('onVideoLoadStart');
        setIsLoading(true);
      };
    
      const onTextTrackDataChanged = (data: OnTextTrackDataChangedData) => {
        console.log(`Subtitles: ${JSON.stringify(data, null, 2)}`);
      };
    
      const onAspectRatio = (data: OnVideoAspectRatioData) => {
        console.log('onAspectRadio called ' + JSON.stringify(data));
        setVideoSize({videoWidth: data.width, videoHeight: data.height});
      };
    
      const onVideoBuffer = (param: OnBufferData) => {
        console.log('onVideoBuffer');
        setIsLoading(param.isBuffering);
      };
    
      const onReadyForDisplay = () => {
        console.log('onReadyForDisplay');
        setIsLoading(false);
      };
    
      const onAudioBecomingNoisy = () => {
        setPaused(true);
      };
    
      const onAudioFocusChanged = (event: OnAudioFocusChangedData) => {
        setPaused(!event.hasAudioFocus);
      };
    
      const onError = (err: OnVideoErrorData) => {
        console.log(JSON.stringify(err));
      };
    
      const onEnd = () => {
        console.log('onEnd');
      };
    
      const onPlaybackRateChange = (data: OnPlaybackRateChangeData) => {
        console.log('onPlaybackRateChange', data);
      };
    
      const onPlaybackStateChanged = (data: OnPlaybackStateChangedData) => {
        console.log('onPlaybackStateChanged', data);
      };
    
      const onVideoBandwidthUpdate = (data: OnBandwidthUpdateData) => {
        console.log('onVideoBandwidthUpdate', data);
      };


    

    return (
      <>
        <Video
        source={{ uri: currentHint.hint.hintMedia[0].mediaUrl }}
        style={[styles.productImage, {height: ITEM_HEIGHT}]}
        resizeMode="cover"
        ref={videoRef}
        onLoad={onLoad}
        onVideoTracks={onVideoTracks}
        onAudioTracks={onAudioTracks}
        onTextTracks={onTextTracks}
        onProgress={onProgress}
        onSeek={onSeek}
        onBuffer={onVideoBuffer}
        onEnd={onEnd}
        onError={onError}
        onReadyForDisplay={onReadyForDisplay}
        onPlaybackRateChange={onPlaybackRateChange}
        onPlaybackStateChanged={onPlaybackStateChanged}
        onBandwidthUpdate={onVideoBandwidthUpdate}
        onAudioFocusChanged={onAudioFocusChanged}
        onAudioBecomingNoisy={onAudioBecomingNoisy}
        paused={paused}
        muted={muted}
        volume={volume}
        repeat={true}
        controls={false}
        playInBackground={false}

        />

        <HintOverlay 
        currentHint={currentHint} 
        HINT_HEIGHT={ITEM_HEIGHT} 
        
        currentTime={currentTime}
        duration={duration}

        isSeeking={isSeeking}
        setIsSeeking={setIsSeeking}

        isLoading={isLoading}
        
        />
      </>
    );
}

export default VideoItem;

const styles = StyleSheet.create({
    productImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
    overlayText: {
        color: 'blue',
        fontSize: 20,
    },
});