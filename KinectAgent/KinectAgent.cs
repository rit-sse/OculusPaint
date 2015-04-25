using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using Microsoft.Kinect;
using Newtonsoft.Json;
using System.Threading;

namespace Microsoft.Samples.Kinect.BodyBasics
{
    class KinectAgent
    {

        /// <summary>
        /// Drawing group for body rendering output
        /// </summary>
        private DrawingGroup drawingGroup;

        /// <summary>
        /// Active Kinect sensor
        /// </summary>
        private KinectSensor kinectSensor = null;

        /// <summary>
        /// Coordinate mapper to map one type of point to another
        /// </summary>
        private CoordinateMapper coordinateMapper = null;

        /// <summary>
        /// Reader for body frames
        /// </summary>
        private BodyFrameReader bodyFrameReader = null;

        /// <summary>
        /// Array for the bodies
        /// </summary>
        private Body[] bodies = null;

        /// <summary>
        /// definition of bones
        /// </summary>
        private List<Tuple<JointType, JointType>> bones;

        MyTCP_Client tcp;
        bool hasConnection;
        string server = "mycroft.ad.sofse.org";

        public KinectAgent()
        {
            MyTCP_Client tcp = new MyTCP_Client();
            this.tcp = tcp;
            this.hasConnection = true;
            StartUp();
        }

        /// <summary>
        /// Initializes a new instance of the MainWindow class.
        /// </summary>
        public void StartUp()
        {
            // one sensor is currently supported
            this.kinectSensor = KinectSensor.GetDefault();

            // get the coordinate mapper
            this.coordinateMapper = this.kinectSensor.CoordinateMapper;

            // get the depth (display) extents
            FrameDescription frameDescription = this.kinectSensor.DepthFrameSource.FrameDescription;

            // open the reader for the body frames
            this.bodyFrameReader = this.kinectSensor.BodyFrameSource.OpenReader();

            // a bone defined as a line between two joints
            this.bones = new List<Tuple<JointType, JointType>>();

            // Torso
            this.bones.Add(new Tuple<JointType, JointType>(JointType.Head, JointType.Neck));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.Neck, JointType.SpineShoulder));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.SpineShoulder, JointType.SpineMid));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.SpineMid, JointType.SpineBase));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.SpineShoulder, JointType.ShoulderRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.SpineShoulder, JointType.ShoulderLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.SpineBase, JointType.HipRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.SpineBase, JointType.HipLeft));

            // Right Arm
            this.bones.Add(new Tuple<JointType, JointType>(JointType.ShoulderRight, JointType.ElbowRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.ElbowRight, JointType.WristRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.WristRight, JointType.HandRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.HandRight, JointType.HandTipRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.WristRight, JointType.ThumbRight));

            // Left Arm
            this.bones.Add(new Tuple<JointType, JointType>(JointType.ShoulderLeft, JointType.ElbowLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.ElbowLeft, JointType.WristLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.WristLeft, JointType.HandLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.HandLeft, JointType.HandTipLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.WristLeft, JointType.ThumbLeft));

            // Right Leg
            this.bones.Add(new Tuple<JointType, JointType>(JointType.HipRight, JointType.KneeRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.KneeRight, JointType.AnkleRight));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.AnkleRight, JointType.FootRight));

            // Left Leg
            this.bones.Add(new Tuple<JointType, JointType>(JointType.HipLeft, JointType.KneeLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.KneeLeft, JointType.AnkleLeft));
            this.bones.Add(new Tuple<JointType, JointType>(JointType.AnkleLeft, JointType.FootLeft));

            // open the sensor
            this.kinectSensor.Open();

            // set the status text
            //this.StatusText = this.kinectSensor.IsAvailable ? Properties.Resources.RunningStatusText
            //                                                : Properties.Resources.NoSensorStatusText;

            // Create the drawing group we'll use for drawing
            this.drawingGroup = new DrawingGroup();

            if (this.bodyFrameReader != null)
            {
                this.bodyFrameReader.FrameArrived += this.Reader_FrameArrived;
            }

            Console.WriteLine("Got to end");
        }

        /// <summary>
        /// Handles the body frame data arriving from the sensor
        /// </summary>
        /// <param name="sender">object sending the event</param>
        /// <param name="e">event arguments</param>
        private void Reader_FrameArrived(object sender, BodyFrameArrivedEventArgs e)
        {
            //Console.WriteLine("Frame Arrived");
            bool dataReceived = false;

            using (BodyFrame bodyFrame = e.FrameReference.AcquireFrame())
            {
                if (bodyFrame != null)
                {
                    if (this.bodies == null)
                    {
                        this.bodies = new Body[bodyFrame.BodyCount];
                    }
                    Thread.Sleep(100);
                    // The first time GetAndRefreshBodyData is called, Kinect will allocate each Body in the array.
                    // As long as those body objects are not disposed and not set to null in the array,
                    // those body objects will be re-used.
                    bodyFrame.GetAndRefreshBodyData(this.bodies);
                    dataReceived = true;
                }
            }
            
            if (dataReceived)
            {

                // Draw a transparent background to set the render size

                Body body = this.bodies[0];


                if (body.IsTracked)
                {
                    IReadOnlyDictionary<JointType, Joint> joints = body.Joints;
                    this.SendBodyParts(joints);

                }
                    
                
            }
        }

       private void SendBodyParts(IReadOnlyDictionary<JointType, Joint> joints){
           Console.WriteLine("Sending BodyParts");
            bool status = true;
            BodyPart leftHand = this.GrabJoint(joints, JointType.HandLeft,out status);
            BodyPart rightHand = this.GrabJoint(joints, JointType.HandRight, out status);
            BodyPart torso = this.GrabJoint(joints, JointType.SpineBase, out status);

            if (status)
            {
                MessageBody body = new MessageBody(leftHand, rightHand, torso);
                Message message = new Message("Kinect1", "Master", body);
                string send = JsonConvert.SerializeObject(message);
                try
                {
                    this.tcp.Connect(this.server, send);
                }
                catch (LostConnection e)
                {
                    if (!LostConnectionToServer(e.Message, send))
                    {
                        this.hasConnection = false;
                    }
                }

            }
        }

        private BodyPart GrabJoint(IReadOnlyDictionary<JointType, Joint> joints, JointType jointType, out bool status) {
            CameraSpacePoint joint = joints[jointType].Position;
            BodyPart bP = new BodyPart(joint.X, joint.Y, joint.Z, true);
            status = true;
            if (joints[JointType.HandTipLeft].TrackingState != TrackingState.Tracked)
            {
                status = false;
                Console.WriteLine("Lost Track of " + jointType.ToString());
            }
            return bP;

        }

        private bool LostConnectionToServer(String timeoutLength, String send)
        {
            int start = DateTime.Now.Millisecond;
            int diff = Convert.ToInt32(timeoutLength);
            bool reconnected = false;
            while (DateTime.Now.Millisecond < start + diff)
            {
                Thread.Sleep(diff / 5);
                this.tcp = new MyTCP_Client();
                try
                {
                    this.tcp.Connect(this.server, send);
                    reconnected = true;
                    break;
                }
                catch (LostConnection e) { }
            }
            return reconnected;
        }

        static void Main(string[] args)
        {
            KinectAgent sg = new KinectAgent();
            while (sg.hasConnection) ;
        }

    }

    
}
