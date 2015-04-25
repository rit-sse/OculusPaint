using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.Samples.Kinect.BodyBasics
{
    class BodyPart
    {
        public double x;
        public double y;
        public double z;
        public String state;

        public BodyPart(double x, double y, double z, String state)
        {
            this.x = x;
            this.y = y;
            this.z = z;
            this.state = state;
        }

    }
}
