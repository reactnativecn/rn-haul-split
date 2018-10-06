using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Chunk.Split.RNChunkSplit
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNChunkSplitModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNChunkSplitModule"/>.
        /// </summary>
        internal RNChunkSplitModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNChunkSplit";
            }
        }
    }
}
