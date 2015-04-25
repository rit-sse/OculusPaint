

namespace Microsoft.Samples.Kinect.BodyBasics
{
    class MessageBody
    {
        public BodyPart RHand;
        public BodyPart LHand;
        public BodyPart Torso;

        public MessageBody(BodyPart RHand, BodyPart LHand, BodyPart Torso)
        {
            this.RHand = RHand;
            this.LHand = LHand;
            this.Torso = Torso;
        }
    }
}
