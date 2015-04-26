using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.IO;

namespace Microsoft.Samples.Kinect.BodyBasics
{
   

    class MyTCP_Client

    {
        private TcpClient tcp = null;

    public void CloseConnection()
    {
        tcp.GetStream().Close();
        this.tcp.Close();
    }

    public void Connect(String server, String message)
        {
            try
            {
                // Create a TcpClient. 
                // Note, for this client to work you need to have a TcpServer  
                // connected to the same address as specified by the server, port 
                // combination.
                if (tcp == null)
                {
                    Int32 port = 8126;
                    tcp = new TcpClient(server, port);
                }
                // Translate the passed message into ASCII and store it as a Byte array.
                Byte[] data = System.Text.Encoding.ASCII.GetBytes(","+message);

                // Get a client stream for reading and writing. 
                //  Stream stream = client.GetStream();

                NetworkStream stream = tcp.GetStream();

                // Send the message to the connected TcpServer. 
                stream.Write(data, 0, data.Length);

                // Close everything.
                
            }
            catch (ArgumentNullException e)
            {
                Console.WriteLine("ArgumentNullException: {0}", e);
            }
            catch (SocketException e)
            {
                Console.WriteLine("SocketException: {0}", e);
            }
            catch (IOException e)
            {
                throw new LostConnection("50000");
            }

        }
    }
}

