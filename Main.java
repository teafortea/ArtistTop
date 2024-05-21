import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/image", new ImageHandler());
        server.setExecutor(null);
        server.start();
    }

    static class ImageHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Step 1: Generate the PNG Image
            BufferedImage image = generatePNG();

            // Step 2: Convert the Image to Base64 String
            String base64Image = encodeImageToBase64(image);

            // Step 3: Return the base64 URL as the response
            String response = "data:image/png;base64," + base64Image;
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }

        private String encodeImageToBase64(BufferedImage image) {
            try {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(image, "png", baos);
                byte[] bytes = baos.toByteArray();
                return Base64.getEncoder().encodeToString(bytes);
            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }
        }

        private BufferedImage generatePNG() {
            // Create a BufferedImage
            BufferedImage bufferedImage = new BufferedImage(900, 700, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g2d = bufferedImage.createGraphics();

            // Draw some text
            g2d.setColor(Color.WHITE);
            g2d.setFont(new Font("Arial", Font.BOLD, 36));
            g2d.drawString("Hello, World!", 100, 100);

            // Dispose the Graphics2D object
            g2d.dispose();

            return bufferedImage;
        }
    }
}
