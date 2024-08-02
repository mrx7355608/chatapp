import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class Server {
    public static ArrayList<Socket> onlinePeople;

    public static void main(String[] args) {
        try {
            onlinePeople = new ArrayList<>();

            ServerSocket ss = new ServerSocket(5555);
            System.out.println("Listening...");
            while (true) {
                Socket socket = ss.accept();
                System.out.println("Connected: " + socket.getInetAddress());

                onlinePeople.add(socket);

                String username = new DataInputStream(socket.getInputStream()).readUTF();
                System.out.println("Username: " + username);
                new Thread(new ClientHandler(socket, username)).start();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public static void broadcastMessage(String message) {
        System.out.println(message);

        for (Socket s : onlinePeople) {
            try {
                DataOutputStream out = new DataOutputStream(s.getOutputStream());
                out.writeUTF(message);
//                out.flush();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
