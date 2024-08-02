import java.io.DataInputStream;
import java.io.IOException;
import java.net.Socket;

public class ClientHandler implements Runnable{
    private Socket socket;
    private String username;

    public ClientHandler(Socket socket, String username) {
        this.socket = socket;
        this.username = username;
    }

    @Override
    public void run() {
        DataInputStream din;

        while (true) {
            try {
                if (!this.socket.isConnected()) {
                    System.out.println("Client disconnected");
                    break;
                }


                din = new DataInputStream(this.socket.getInputStream());
                if (din.available() > 0) {
                    String message = this.username + ": " + din.readUTF();

                    // Broadcast message
                    System.out.println("broadcasting...");
                    Server.broadcastMessage(message);
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
