using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.Samples.Kinect.BodyBasics
{
    class Message
    {
        public String from;
        public String to;
        public MessageBody data;

        public Message(String from, String to, MessageBody data)
        {
            this.from = from;
            this.to = to;
            this.data = data;
        }
    }
}
