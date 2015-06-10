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
    
    var BiquadFilterNode=function() {
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


    var OscilatorNode = function () {

    }
    OscilatorNode.prototype = new AudioNode();
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

    this.createBuffer = function () {
        ///<summary>Creates an AudioBuffer of the given size. The audio data in the buffer will be zero-initialized (silent). An exception will be thrown if the numberOfChannels or sampleRate are out-of-bounds.  </summary>
    }
    this.createBufferSource = function () {
        ///<summary>Creates an AudioBufferSourceNode that can be used to play audio data contained within an AudioBuffer object..  </summary>
    }
    this.createChannelMerger = function () {
        ///<summary>Creates a ChannelMergerNode representing a channel merger. An exception will be thrown for invalid parameter values.  </summary>
    }
    this.createChannelSplitter = function () {
        ///<summary>Creates a ChannelSplitterNode representing a channel splitter. An exception will be thrown for invalid parameter values.  </summary>
    }
    this.createConvolver = function () {
        ///<summary>Creates a ConvolverNode, commonly used to add reverb to audio.  </summary>
    }
    this.createDelay = function () {
        ///<summary>Creates a DelayNode representing a variable delay line. Default delay is 0 seconds.  </summary>
    }
    this.createDynamicsCompressor = function () {
        ///<summary>Creates a DynamicsCompressorNode, used to apply compression to audio.  </summary>
    }
    this.createGain = function () {
        ///<summary>Creates a GainNode, used to control the volume of audio.  </summary>
    }
    this.createMediaElementSource = function () {
        ///<summary>Creates a MediaElementAudioSourceNode, given an HTMLMediaElement. As a consequence of calling this method, audio playback from the HTMLMediaElement will be re-routed into the processing graph of the AudioContext.  </summary>
    }
    this.createMediaStreamSource = function () {
        ///<summary>Creates a MediaStreamAudioSourceNode, given a MediaStream. As a consequence of calling this method, audio playback from the MediaStream will be re-routed into the processing graph of the AudioContext.  </summary>
    }
    this.createOscillator = function () {
        ///<summary>Creates an OscillatorNode, a source representing a periodic waveform. It basically generates a constant tone..  </summary>      
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

// ** Copy-paste repository **
// <field name='' type=''></field>
// <summary></summary>
// <returns type=''></returns>
// <param name='' type=''></param>