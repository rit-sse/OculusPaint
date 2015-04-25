using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.Samples.Kinect.BodyBasics
{
    class LostConnection: Exception
    {
        public LostConnection(string message)
            : base(message)
        {
            
        }
    }
}
