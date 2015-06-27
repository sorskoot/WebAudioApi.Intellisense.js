AudioContext = function () {
    ///<summary>
    /// The AudioContext represents a set of AudioNode objects and their connections. 
    /// It allows for arbitrary routing of signals to the AudioDestinationNode 
    /// (what the user ultimately hears). Nodes are created from the context and are then connected together. 
    /// In most use cases, only a single AudioContext is used per document. 
    /// </summary>    

    // **************************************************************************************
    // **************************************************************************************
    // ** internal objects
    // **************************************************************************************
    // **************************************************************************************

    /// <field name='currentTime' type='Number'>This is a time in seconds which starts at zero when the context is created and increases in real-time. All scheduled times are relative to it. This is not a transport time which can be started, paused, and re-positioned. It is always moving forward. A GarageBand-like timeline transport system can be very easily built on top of this (in JavaScript). This time corresponds to an ever-increasing hardware timestamp.</field>
    /// <field name='destination' type='AudioDestinationNode'> An AudioDestinationNode with a single input representing the final destination for all audio (to be rendered to the audio hardware, i.e., speakers). All AudioNodes actively rendering audio will directly or indirectly connect to the destination node.</field>
    /// <field name='listener' type='AudioListener'> An AudioListener, used for 3D spatialization.</field>
    /// <field name='sampleRate' type='Number'>The sample rate, in sample-frames per second, at which the AudioContext handles audio. It is assumed that all AudioNodes in the context run at this rate. In making this assumption, sample-rate converters or varispeed processors are not supported in real-time processing.</field>      
    var AudioNode = function () {
        /// <summary>AudioNodes are the building blocks of an AudioContext. An AudioNode represents audio sources, the audio destination, and intermediate processing modules, connected together to form processing graphs for rendering audio to the audio hardware. In general, an AudioNode processes its inputs (if it has any), and generates audio for its outputs (if it has any). </summary>
        /// <field name='context' type='AudioContext'>The AudioContext that owns this AudioNode. </field>
        /// <field name='numberOfInputs' type='Number'>The number of inputs feeding into the AudioNode. For source nodes, this value will be 0</field>
        /// <field name='numberOfOutputs' type='Number'>The number of outputs coming out of an AudioNode. For destination nodes, this will be 0</field>
        this.connect = function (destination, output, input) {
            /// <summary>Connects one AudioNode to another AudioNode. </summary>
            /// <param name='destination' type='Number'>(optional)The AudioNode to connect to. </param>
            /// <param name='output' type='Number'>(optional)An index describing which output of the AudioNode to connect from. An out-of-bound value throws an exception. </param>
            /// <param name='input' type='Number'>(optional)An index describing which input of the destination AudioNode to connect to. An out-of-bound value throws an exception.</param>
        }
        this.disconnect = function (output) {
            /// <summary>Disconnects an AudioNode from another that it is already connected to. </summary>
            /// <param name='output' type='Number'>(optional)An index describing which output of the AudioNode to disconnect. An out-of-bound value throws an exception.</param>
        }
    }

    var AudioParam = function () {
        /// <summary>AudioParam controls an individual aspect of an AudioNode's functioning, such as volume. The parameter can be set immediately to a particular value using the value attribute. Or, value changes can be scheduled to happen at very precise times (in the coordinate system of AudioContext's currentTime attribute), for envelopes, volume fades, LFOs, filter sweeps, grain windows, etc. In this way, arbitrary timeline-based automation curves can be set on any AudioParam. Additionally, audio signals from the outputs of AudioNodes can be connected to an AudioParam, summing with the intrinsic parameter value.</summary>
        /// <field name='value' type='Number'>defaultValue of type float, readonly. Initial value for the 'value' attribute.</field>
        /// <field name='defaultValue' type='Number'>The parameter's floating-point value. This attribute is initialized to the defaultValue. If value is set during a time when there are any automation events scheduled then it will be ignored and no exception will be thrown.</field>
        this.setValueAtTime = function (value, startTime) {
            /// <summary>Schedules a parameter value change at the given time.</summary>
            /// <param name='value' type='float'>The value parameter is the value the parameter will change to at the given time.</param>
            /// <param name='startTime' type='double'>The startTime parameter is the time in the same time coordinate system as the AudioContext's currentTime attribute. An InvalidAccessError exception must be thrown if startTime is negative or is not a finite number.</param>
            /// <returns type='void'></returns>
        }
        this.linearRampToValueAtTime = function (value, endTime) {
            /// <summary>Schedules a linear continuous change in parameter value from the previous scheduled parameter value to the given value.</summary>
            /// <param name='value' type='float'>The value parameter is the value the parameter will linearly ramp to at the given time.</param>
            /// <param name='endTime' type='double'>he endTime parameter is the time in the same time coordinate system as the AudioContext's currentTime attribute. An InvalidAccessError exception must be thrown if endTime is negative or is not a finite number.</param>
            /// <returns type='void'></returns>
        }
        this.exponentialRampToValueAtTime = function (value, endTime) {
            /// <summary>
            /// <para>Schedules an exponential continuous change in parameter value from the previous scheduled parameter value to the given value. Parameters representing filter frequencies and playback rate are best changed exponentially because of the way humans perceive sound.</para>
            /// <para></para>
            /// <para>The value parameter is the value the parameter will exponentially ramp to at the given time. A NotSupportedError exception must be thrown if this value is less than or equal to 0, or if the value at the time of the previous event is less than or equal to 0.</para>
            /// </summary>
            /// <param name='value' type='float'>The value parameter is the value the parameter will exponentially ramp to at the given time. A NotSupportedError exception must be thrown if this value is less than or equal to 0, or if the value at the time of the previous event is less than or equal to 0.</param>
            /// <param name='endTime' type='double'>The endTime parameter is the time in the same time coordinate system as the AudioContext's currentTime attribute. An InvalidAccessError exception must be thrown if endTime is negative or is not a finite number.</param>
            /// <returns type='void'></returns>
        }
        this.setTargetAtTime = function (target, startTime, timeConstant) {
            /// <summary>Start exponentially approaching the target value at the given time with a rate having the given time constant. Among other uses, this is useful for implementing the "decay" and "release" portions of an ADSR envelope. Please note that the parameter value does not immediately change to the target value at the given time, but instead gradually changes to the target value.</summary>
            /// <param name='target' type='float'>The target parameter is the value the parameter will start changing to at the given time.</param>
            /// <param name='startTime' type='double'>The startTime parameter is the time in the same time coordinate system as the AudioContext's currentTime attribute. An InvalidAccessError exception must be thrown if start is negative or is not a finite number.</param>
            /// <param name='timeConstant' type='float'>The timeConstant parameter is the time-constant value of first-order filter (exponential) approach to the target value. The larger this value is, the slower the transition will be.</param>
            /// <returns type='void'></returns>
        }
        this.setValueCurveAtTime = function (values, startTime, duration) {
            /// <summary>Sets an array of arbitrary parameter values starting at the given time for the given duration. The number of values will be scaled to fit into the desired duration.</summary>
            /// <param name='values' type='Float32Array'>The values parameter is a Float32Array representing a parameter value curve. These values will apply starting at the given time and lasting for the given duration. Any modification to the the array used as values argument after the call won't have any effect on the AudioParam.</param>
            /// <param name='startTime' type='double'>The startTime parameter is the time in the same time coordinate system as the AudioContext's currentTime attribute. An InvalidAccessError exception must be thrown if startTime is negative or is not a finite number.</param>
            /// <param name='duration' type='double'>The duration parameter is the amount of time in seconds (after the time parameter) where values will be calculated according to the values parameter.</param>
            /// <returns type='void'></returns>
        }
        this.cancelScheduledValues = function (startTime) {
            /// <summary>Cancels all scheduled parameter changes with times greater than or equal to startTime.</summary>
            /// <param name='startTime' type='double'>The startTime parameter is the starting time at and after which any previously scheduled parameter changes will be cancelled. It is a time in the same time coordinate system as the AudioContext's currentTime attribute. An InvalidAccessError exception must be thrown if startTime is negative or is not a finite number.</param>
            /// <returns type='void'></returns>
        }
    }

    var AnalyserNode = function () {
        ///<summary>
        /// This interface represents a node which is able to provide real-time frequency and time-domain analysis information. The audio stream will be passed un-processed from input to output. 
        ///</summary>
        /// <field name='fftSize' type='Number'>The size of the FFT (Fast Fourier Transform) used for frequency-domain analysis. Must be a power of two in the range 32-2048; defaults to 2048.</field>
        /// <field name='frequencyBinCount' type='Number'>Half the fftSize (the size of the FFT used for frequency-domain analysis). </field>
        /// <field name='maxDecibels' type='Number'>The maximum power value in the scaling range for the FFT analysis data for conversion to unsigned byte values. </field>
        /// <field name='minDecibels' type='Number'>The minimum power value in the scaling range for the FFT analysis data for conversion to unsigned byte values. Default is -100.</field>
        /// <field name='smoothingTimeConstant' type='Number'>A value from 0 to 1 representing the averaging constant with the last analysis frame. Default is 0.8. </field>
        this.getByteFrequencyData = function (data) {
            /// <summary>Copies the current frequency data into the passed unsigned byte array. If the array has fewer elements than the frequencyBinCount, the excess elements will be dropped. </summary>
            /// <param name='data' type='Array'>Where frequency-domain analysis data will be copied.</param>
            /// <returns type='Uint8Array'>values are copied into 'data' parameter</returns>
        }

        this.getByteTimeDomainData = function (data) {
            /// <summary>Copies the current time-domain (waveform) data into the passed unsigned byte array. If the array has fewer elements than the frequencyBinCount, the excess elements will be dropped.</summary>
            /// <param name='data' type='Array'>Where frequency-domain analysis data will be copied.</param>
            /// <returns type='Uint8Array'>values are copied into 'data' parameter</returns>
        }

        this.getFloatFrequencyData = function (data) {
            /// <summary>Copies the current frequency data into the passed floating-point array. If the array has fewer elements than the frequencyBinCount, the excess elements will be dropped. </summary>
            /// <param name='data' type='Array'>Where frequency-domain analysis data will be copied.</param>
            /// <returns type='Float32Array'>values are copied into 'data' parameter</returns>
        }
    }
    AnalyserNode.prototype = new AudioNode();

    var BiquadFilterNode = function () {
        /// <summary>BiquadFilterNode is an AudioNode processor implementing common low-order filters, which are the building blocks of basic tone controls (bass, mid, treble), graphic equalizers, and more advanced filters. Multiple BiquadFilterNode filters can be combined to form more complex filters. Each BiquadFilterNode can be configured as one of a number of common filter types as listed in the type property page, linked below. The default filter type is LOWPASS. </summary>
        /// <field name='Q' type='Number'>Used in different ways by the various types. Defaults to 1, with a nominal range of 0.0001 to 1000. This parameter is k-rate. </field>
        /// <field name='frequency' type='Number'> Used in different ways by the various types. Defaults to 350Hz, with a nominal range of 10 to the Nyquist frequency (half the sample-rate). This parameter is k-rate</field>
        /// <field name='gain' type='Number'>Used in different ways by the various types. Defaults to 0, with a nominal range of -40 to 40. This parameter is k-rate. </field>
        /// <field name='type' type='Number'> The type of BiquadFilterNode (filtering algorithm) the node is implementing.
        /// Uses one of the following constant values:
        /// <list type='dotted'>
        ///     <para>LOWPASS (0) (default), a standard second-order resonant lowpass filter with 12dB/octave rolloff; </para>
        ///     <para>HIGHPASS (1), a standard second-order resonant highpass filter with 12dB/octave rolloff; </para>
        ///     <para>BANDPASS (2), a second-order bandpass filter; </para>
        ///     <para>LOWSHELF (3), a second-order lowshelf filter; </para>
        ///     <para>HIGHSHELF (4), a second-order highshelf filter; </para>
        ///     <para>PEAKING (5), a boost (or attenuation) to a range of frequencies; </para>
        ///     <para>NOTCH (6), restricting a set of frequencies; </para>
        ///     <para>ALLPASS (7), a second-order allpass filter.</para>
        ///</list>
        ///</field>
        this.getFrequencyResponse = function (frequencyHz, magResponse, phaseResponse) {
            /// <summary>Given the current filter parameter settings, calculates the frequency response for the specified frequencies. </summary>
            /// <param name='frequencyHz' type='Array'>Specifies an array of frequencies at which the response values will be calculated.</param>
            /// <param name='magResponse' type='Array'>Specifies an output array receiving the linear magnitude response values.</param>
            /// <param name='phaseResponse' type='Array'>Specifies an output array receiving the phase response values in radians.</param>
        }
    }
    BiquadFilterNode.prototype = new AudioNode();

    var AudioBuffer = function () {
        /// <summary>This interface represents a memory-resident audio asset, primarily for one-shot sounds and other short audio clips. Its format is non-interleaved IEEE 32-bit linear PCM with a nominal range of -1 -> +1. It can contain one or more channels. </summary>
        /// <field name='sampleRate' type='float'>The sample rate, in samples per second, for the PCM audio data. </field>
        /// <field name='length' type='long'>Length, in sample-frames, of the PCM audio data. </field>
        /// <field name='duration' type='double'>Duration, in seconds, of the PCM audio data in the buffer. </field>
        /// <field name='numberOfChannels' type='long'>The number of discrete audio channels described by the PCM audio data. </field>
        this.getChannelData = function (channel) {
            /// <summary>Returns the Float32Array representing the PCM audio data for the specific channel. </summary>
            /// <param name='channel' type='unsigned long'>This parameter is an index representing the particular channel to get data for. An index value of 0 represents the first channel. This index value MUST be less than numberOfChannels or an IndexSizeError exception MUST be thrown. </param>
            /// <returns type='Float32Array'>The channel data</returns>
        }
        this.copyToChannel = function (source, channelNumber, startInChannel) {
            /// <summary>The copyToChannel method copies the samples to the specified channel of the AudioBuffer, from the source array. </summary>
            /// <param name='source' type='Float32Array' optional='false' mayBeNull='false' >The array the channel data will be copied from. </param>
            /// <param name='channelNumber' type='long' optional='false' mayBeNull='false' >The index of the channel to copy the data to. If channelNumber is greater or equal than the number of channel of the AudioBuffer, an IndexSizeError MUST be thrown. </param>
            /// <param name='startInChannel' type='unsigned long' optional='false' mayBeNull='true' >An optional offset to copy the data to. If startInChannel is greater than the length of the AudioBuffer, an IndexSizeError MUST be thrown. </param>
            /// <returns type='void'></returns>
        }
        this.copyFromChannel = function (destination, channelNumber, startInChannel) {
            /// <summary>The copyFromChannel method copies the samples from the specified channel of the AudioBuffer to the destination array. </summary>
            /// <param name='source' type='Float32Array' optional='false' mayBeNull='false' >The array the channel data will be copied to. </param>
            /// <param name='channelNumber' type='long' optional='false' mayBeNull='false' >The index of the channel to copy the data from. If channelNumber is greater or equal than the number of channel of the AudioBuffer, an IndexSizeError MUST be thrown. </param>
            /// <param name='startInChannel' type='unsigned long' optional='false' mayBeNull='true' >An optional offset to copy the data from. If startInChannel is greater than the length of the AudioBuffer, an IndexSizeError MUST be thrown. </param>
            /// <returns type='void'></returns>
        }
    }

    var AudioBufferSourceNode = function () {
        /// <summary>This interface represents an audio source from an in-memory audio asset in an AudioBuffer. It is useful for playing short audio assets which require a high degree of scheduling flexibility (can playback in rhythmically perfect ways). The start() method is used to schedule when sound playback will happen. The playback will stop automatically when the buffer's audio data has been completely played (if the loop attribute is false), or when the stop() method has been called and the specified time has been reached. Please see more details in the start() and stop() description. start() and stop() may not be issued multiple times for a given AudioBufferSourceNode. </summary>
        /// <field name='buffer' type='AudioBuffer' mayBeNull='true'>Represents the audio asset to be played. </field>
        /// <field name='detune' type='AudioParam' >An aditional parameter to modulate the speed at which is rendered the audio stream. Its default value is 0. Its nominal range is [-1200; 1200]. This parameter is k-rate. </field>
        /// <field name='loop' type='boolean'>Indicates if the audio data should play in a loop. The default value is false. </field>
        /// <field name='loopEnd' type='double'>An optional value in seconds where looping should end if the loop attribute is true. Its default value is 0, and it may usefully be set to any value between 0 and the duration of the buffer.</field>
        /// <field name='loopStart' type='double'>An optional value in seconds where looping should begin if the loop attribute is true. Its default value is 0, and it may usefully be set to any value between 0 and the duration of the buffer. </field>
        /// <field name='playbackRate' type='AudioParam'>The speed at which to render the audio stream. Its default value is 1. This parameter is k-rate. </field>
        /// <field name='onended' type='EventHandler'>A property used to set the EventHandler (described in   HTML[HTML]) for the ended event that is dispatched to AudioBufferSourceNode node types. When the playback of the buffer for an AudioBufferSourceNode is finished, an event of type Event (described in  HTML [HTML]) will be dispatched to the event handler. </field>
        this.start = function (when, offset, duration) {
            /// <summary>Schedules a sound to playback at an exact time. </summary>
            /// <returns type='void'></returns>
            /// <param name='when' type='double' mayBeNull='false' optional='true'>The when parameter describes at what time (in seconds) the sound should start playing. It is in the same time coordinate system as the AudioContext's currentTime attribute. If 0 is passed in for this value or if the value is less than currentTime, then the sound will start playing immediately. start may only be called one time and must be called before stop is called or an InvalidStateError exception MUST be thrown. An InvalidAccessError exception MUST be thrown if when is negative or is not a finite number. </param>
            /// <param name='offset' type='double' mayBeNull='false' optional='true'>The offset parameter describes the offset time in the buffer (in seconds) where playback will begin. If 0 is passed in for this value, then playback will start from the beginning of the buffer. An InvalidAccessError exception MUST be thrown if offset is negative or is not a finite number. </param>
            /// <param name='duration' type='double' mayBeNull='false' optional='true'>The duration parameter describes the duration of the portion (in seconds) to be played. If this parameter is not passed, the duration will be equal to the total duration of the AudioBuffer minus the offset parameter. Thus if neither offset nor duration are specified then the implied duration is the total duration of the AudioBuffer. An InvalidAccessError exception MUST be thrown if duration is negative or is not a finite number.</param>
        }
        this.stop = function (when) {
            /// <summary>Schedules a sound to stop playback at an exact time. </summary>
            /// <returns type='void'></returns>
            /// <param name='when' type='double' mayBeNull='false' optional='true'>The when parameter describes at what time (in seconds) the sound should stop playing. It is in the same time coordinate system as the AudioContext's currentTime attribute. If 0 is passed in for this value or if the value is less than currentTime, then the sound will stop playing immediately. An InvalidAccessError exception MUST be thrown if when is negative or is not a finite number. If stop is called again after already have been called, the last invocation will be the only one applied; stop times set by previous calls will not be applied, unless the buffer has already stopped prior to any subsequent calls. If the buffer has already stopped, further calls to stop will have no effect. If a stop time is reached prior to the scheduled start time, the sound will not play. </param>            
        }
    }
    AudioBufferSourceNode.prototype = new AudioNode();


    //TODO: Find a way to show these posibilities
    /**
     * @readonly
     * @enum {string}
     */
    var OscillatorType = {
        sine: "sine",
        square: "square",
        sawtooth: "sawtooth",
        triangle: "triangle",
        custom: "custom"
    };
    var PeriodicWave = function () {
        ///<summary>PeriodicWave represents an arbitrary periodic waveform to be used with an OscillatorNode.</summary>
    }
    var OscilatorNode = function () {
        /// <summary>OscillatorNode represents an audio source generating a periodic waveform. It can be set to a few commonly used waveforms. Additionally, it can be set to an arbitrary periodic waveform through the use of a PeriodicWave object. </summary>
        /// <field name='type' type='OscillatorType'>The shape of the periodic waveform. It may directly be set to any of the type constant values except for "custom". The setPeriodicWave() method can be used to set a custom waveform, which results in this attribute being set to "custom". The default value is "sine". When this attribute is set, the phase of the oscillator MUST be conserved.</field>
        /// <field name='frequency' type='AudioParam'>The frequency (in Hertz) of the periodic waveform. Its default value is 440. This parameter is a-rate. </field>
        /// <field name='detune' type='AudioParam'>A detuning value (in Cents) which will offset the frequency by the given amount. Its default value is 0. This parameter is a-rate. </field>
        /// <field name='onended' type='EventHandler'>A property used to set the EventHandler (described in HTML[HTML]) for the ended event that is dispatched to OscillatorNode node types. When the OscillatorNode has finished playing (i.e. its stop time has been reached), an event of type Event (described in HTML[HTML]) will be dispatched to the event handler. </field>
        this.start = function (when) {
            /// <summary>Defined the same as the when parameter of the <seealso>AudioBufferSourceNode.</seealso> </summary>
            /// <returns type='void'></returns>
            /// <param name='when' type='double' optional='true'></param>
        }
        this.stop = function (when) {
            /// <summary>Defined as in AudioBufferSourceNode.</summary>
            /// <returns type='void'></returns>
            /// <param name='when' type='double' optional='true'></param>
        }
        this.setPeriodicWave = function (periodicWave) {
            /// <summary>Sets an arbitrary custom periodic waveform given a PeriodicWave. </summary>
            /// <returns type='void'></returns>
            /// <param name='periodicWave' type='PeriodicWave' mayBeNull='false'></param>
        }
    }

    OscilatorNode.prototype = new AudioNode();

    var GainNode = function () {
        ///<field name='gain' type='AudioParam'>gain</field>        
    }
    GainNode.prototype = new AudioNode();

    var ChannelMergerNode = function () {
        ///<summary>
        ///The ChannelMergerNode is for use in more advanced applications and would often be used in conjunction with ChannelSplitterNode. 
        ///This interface represents an AudioNode for combining channels from multiple audio streams into a single audio stream. It has a variable number of inputs (defaulting to 6), but not all of them need be connected. There is a single output whose audio stream has a number of channels equal to the number of inputs. 
        ///</summary>
    }
    ChannelMergerNode.prototype = new AudioNode();

    var ChannelSplitterNode = function () {
        ///<summary>
        ///The ChannelSplitterNode is for use in more advanced applications and would often be used in conjunction with ChannelMergerNode. 
        ///This interface represents an AudioNode for accessing the individual channels of an audio stream in the routing graph. It has a single input, and a number of "active" outputs which equals the number of channels in the input audio stream. For example, if a stereo input is connected to an ChannelSplitterNode then the number of active outputs will be two (one from the left channel and one from the right). There are always a total number of N outputs (determined by the numberOfOutputs parameter to the AudioContext method createChannelSplitter()), The default number is 6 if this value is not provided. Any outputs which are not "active" will output silence and would typically not be connected to anything. 
        ///</summary>
    }
    ChannelSplitterNode.prototype = new AudioNode();

    var DynamicsCompressorNode = function () {
        ///<summary>DynamicsCompressorNode is an AudioNode processor implementing a dynamics compression effect. 
        ///Dynamics compression is very commonly used in musical production and game audio. It lowers the volume of the loudest parts of the signal and raises the volume of the softest parts. Overall, a louder, richer, and fuller sound can be achieved. It is especially important in games and musical applications where large numbers of individual sounds are played simultaneous to control the overall signal level and help avoid clipping (distorting) the audio output to the speakers. 
        ///</summary>
        /// <field name='attack' type='AudioParam'>The amount of time (in seconds) to reduce the gain by 10dB. Its default value is 0.003, with a nominal range of 0 to 1. </field>
        /// <field name='knee' type='AudioParam'>A decibel value representing the range above the threshold where the curve smoothly transitions to the "ratio" portion. Its default value is 30, with a nominal range of 0 to 40. </field>
        /// <field name='ratio' type='AudioParam'>The amount of dB change in input for a 1 dB change in output. Its default value is 12, with a nominal range of 1 to 20. </field>
        /// <field name='reduction' type='float'>A read-only decibel value for metering purposes, representing the current amount of gain reduction that the compressor is applying to the signal. If fed no signal the value will be 0 (no gain reduction). </field>
        /// <field name='release' type='AudioParam'>The amount of time (in seconds) to increase the gain by 10dB. Its default value is 0.250, with a nominal range of 0 to 1. </field>
        /// <field name='threshold' type='AudioParam'>The decibel value above which the compression will start taking effect. Its default value is -24, with a nominal range of -100 to 0. </field>
    }
    DynamicsCompressorNode.prototype = new AudioNode();

    var ConvolverNode = function () {
        /// <summary>
        ///This interface represents a processing node which applies a linear convolution effect given an impulse response.        
        ///The input of this node is either mono (1 channel) or stereo (2 channels) and cannot be increased. Connections from nodes with fewer or more channels will be up-mixed or down-mixed appropriately, but a NotSupportedError MUST be thrown if an attempt is made to set channelCount to a value great than 2 or if channelCountMode is set to "max". 
        ///</summary>
        /// <field name='buffer' type='AudioBuffer' mayBeNull='true'>A mono, stereo, or 4-channel AudioBuffer containing the (possibly multi-channel) impulse response used by the ConvolverNode. The AudioBuffer must have 1, 2, or 4 channels or a NotSupportedError exception MUST be thrown. This AudioBuffer must be of the same sample-rate as the AudioContext or an NotSupportedError exception MUST be thrown. At the time when this attribute is set, the buffer and the state of the normalize attribute will be used to configure the ConvolverNode with this impulse response having the given normalization. The initial value of this attribute is null. </field>
        /// <field name='normalize' type='boolean'>Controls whether the impulse response from the buffer will be scaled by an equal-power normalization when the buffer atttribute is set. Its default value is true in order to achieve a more uniform output level from the convolver when loaded with diverse impulse responses. If normalize is set to false, then the convolution will be rendered with no pre-processing/scaling of the impulse response. Changes to this value do not take effect until the next time the buffer attribute is set. </field>
    }
    ConvolverNode.prototype = new AudioNode();

    var DelayNode = function () {
        /// <summary>A delay-line is a fundamental building block in audio applications. This interface is an AudioNode with a single input and single output.</summary>
        /// <field name='delayTime' type='AudioParam'>An AudioParam object representing the amount of delay (in seconds) to apply. Its default value is 0 (no delay). The minimum value is 0 and the maximum value is determined by the maxDelayTime argument to the AudioContext method createDelay. If DelayNode is part of a cycle, then the value of the delayTime attribute is clamped to a minimum of 128 frames (one block). </field>
    }
    DelayNode.prototype = new AudioNode();

    var MediaElementAudioSourceNode = function () {
        /// <summary>This interface represents an audio source from an audio or video element.</summary>
    }
    MediaElementAudioSourceNode.prototype = new AudioNode();

    var MediaStreamAudioSourceNode = function () {
        /// <summary>This interface is an audio destination representing a MediaStream with a single AudioMediaStreamTrack. This MediaStream is created when the node is created and is accessible via the stream attribute. This stream can be used in a similar way as a MediaStream obtained via getUserMedia(), and can, for example, be sent to a remote peer using the RTCPeerConnection (described in [webrtc]) addStream() method. </summay>
        /// <field name='stream' type='MediaStream'>A MediaStream containing a single AudioMediaStreamTrack with the same number of channels as the node itself. </field>
    }
    MediaStreamAudioSourceNode.prototype = new AudioNode();

    // **************************************************************************************
    // **************************************************************************************
    // ** Functions
    // **************************************************************************************
    // **************************************************************************************

    this.createAnalyser = function () {
        ///<summary>creates an AnalyserNode</summary>
        ///<returns type='AnalyserNode'>an instance of AnalyserNode</returns>
        return new AnalyserNode();
    }

    this.createBiquadFilter = function () {
        ///<summary>Creates a BiquadFilterNode representing a second order filter which can be configured as one of several common filter types. </summary>
        ///<returns type='BiquadFilterNode'>an instance of BiquadFilterNode</returns>
        return new BiquadFilterNode();
    }

    this.createBuffer = function (numberOfChannels, length, sampleRate) {
        ///<summary>Creates an AudioBuffer of the given size. The audio data in the buffer will be zero-initialized (silent). An exception will be thrown if the numberOfChannels or sampleRate are out-of-bounds.  </summary>
        /// <param name='numberOfChannels' type='unsigned long' mayBeNull='false'></param 
        /// <param name='length' type='unsigned long' mayBeNull='false'></param 
        /// <param name='sampleRate' type='float' mayBeNull='false'></param 
        /// <returns type='AudioBuffer'>An AudioBuffer</returns>
        return new AudioBuffer();
    }
    this.createBufferSource = function () {
        ///<summary>Creates an AudioBufferSourceNode that can be used to play audio data contained within an AudioBuffer object..  </summary>
        /// <returns type='AudioBufferSourceNode'>An AudioBufferSource</returns>
        return new AudioBufferSourceNode();
    }
    this.createChannelMerger = function () {
        ///<summary>Creates a ChannelMergerNode representing a channel merger. An exception will be thrown for invalid parameter values.  </summary>
        /// <returns type='ChannelMergerNode'>A ChannelMergerNode</returns>
        return new ChannelMergerNode();
    }
    this.createChannelSplitter = function () {
        ///<summary>Creates a ChannelSplitterNode representing a channel splitter. An exception will be thrown for invalid parameter values.  </summary>
        /// <returns type='ChannelSplitterNode'>A ChannelSplitterNode</returns>
        return new ChannelSplitterNode();
    }
    this.createConvolver = function () {
        ///<summary>Creates a ConvolverNode, commonly used to add reverb to audio.  </summary>
        ///<returns type='ConvolverNode'>A ConvolverNode</returns>
        return new ConvolverNode();
    }
    this.createDelay = function (maxDelayTime) {
        ///<summary>Creates a DelayNode representing a variable delay line. Default delay is 0 seconds.  </summary>
        ///<param name='maxDelayTime' type='double' optional='true' mayBeNull='false'>The maxDelayTime parameter is optional and specifies the maximum delay time in seconds allowed for the delay line. If specified, this value MUST be greater than zero and less than three minutes or a NotSupportedError exception MUST be thrown. </param>
        ///<returns type='DelayNode'>A DelayNode</returns>
        return new DelayNode();
    }
    this.createDynamicsCompressor = function () {
        ///<summary>Creates a DynamicsCompressorNode, used to apply compression to audio.  </summary>
        /// <returns type='DynamicsCompressorNode'>A DynamicsCompressorNode</returns>
        return new DynamicsCompressorNode();
    }
    this.createGain = function () {
        ///<summary>Creates a GainNode, used to control the volume of audio.  </summary>
        /// <returns type='GainNode'>A GainNode</returns>
        return new GainNode();
    }
    this.createMediaElementSource = function (mediaElement) {
        ///<summary>Creates a MediaElementAudioSourceNode, given an HTMLMediaElement. As a consequence of calling this method, audio playback from the HTMLMediaElement will be re-routed into the processing graph of the AudioContext.  </summary>
        ///<param name='mediaElement' type='HTMLMediaElement'>The media element that will be re-routed. </param>
        ///<returns type='MediaElementAudioSourceNode '>An MediaElementAudioSourceNode </returns>
        return new MediaElementAudioSourceNode();
    }
    this.createMediaStreamSource = function () {
        ///<summary>Creates a MediaStreamAudioSourceNode, given a MediaStream. As a consequence of calling this method, audio playback from the MediaStream will be re-routed into the processing graph of the AudioContext.  </summary>
        ///<returns type='MediaStreamAudioSourceNode'>An MediaStreamAudioSourceNode</returns>
        return new MediaStreamAudioSourceNode();
    }
    this.createOscillator = function () {
        ///<summary>Creates an OscillatorNode, a source representing a periodic waveform. It basically generates a constant tone..  </summary>      
        return new OscilatorNode();
    }
    this.createPanner = function () {
        ///<summary>Creates a PannerNode, used to spatialize an incoming audio stream in 3D space..  </summary>
    }
    this.createScriptProcessor = function () {
        ///<summary>Creates a ScriptProcessorNode for direct audio processing using JavaScript. An exception will be thrown if bufferSize or numberOfInputChannels or numberOfOutputChannels are outside the valid range.  </summary>
    }
    this.createWaveShaper = function () {
        ///<summary>Creates a WaveShaperNode, used to apply a distortion effect to audio.  </summary>
    }
    this.decodeAudioData = function () {
        ///<summary>Asynchronously decodes the audio file data contained in the ArrayBuffer. The ArrayBuffer can, for example, be loaded from an XMLHttpRequest with the new responseType and response attributes. Audio file data can be in any of the formats supported by the audio element. The decodeAudioData() method is preferred over the createBuffer() from ArrayBuffer method because it is asynchronous and does not block the main JavaScript thread. </summary>
    }



}


// TODO:
// * change types of params and fields to be ECMAScript languages types from the ECMAScript 5 specification

// ** Copy-paste repository **
// <field name='' type=''></field>
// <summary></summary>
// <returns type=''></returns>
// <param name='' type=''></param>