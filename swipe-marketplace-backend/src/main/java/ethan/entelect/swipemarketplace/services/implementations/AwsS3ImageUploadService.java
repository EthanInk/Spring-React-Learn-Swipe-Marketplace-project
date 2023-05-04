package ethan.entelect.swipemarketplace.services.implementations;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import ethan.entelect.swipemarketplace.entities.Image;
import ethan.entelect.swipemarketplace.services.ImageUploadService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.net.URL;
import java.util.*;

@Service
public class AwsS3ImageUploadService implements ImageUploadService {
    private static final String USER_UPLOADS_FOLDER = "userUploads";
    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.bucket-name}")
    private String awsImageBucketName;

    public AwsS3ImageUploadService(AmazonS3 amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    private String uploadFile(MultipartFile file) {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String key = USER_UPLOADS_FOLDER + "/" + UUID.randomUUID().toString() + "." + extension;
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        try {
            amazonS3Client.putObject(awsImageBucketName, key, file.getInputStream(), metadata);
        } catch (Exception ex) {
            System.out.println(ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading image");
        }
        return amazonS3Client.getUrl(awsImageBucketName, key).toString();
    }

    @Override
    public List<Image> uploadImagesGetURL(List<MultipartFile> rawImages) {
        if(rawImages.isEmpty()) return new ArrayList<>();
        return rawImages.stream().map(image -> {
            Image uploadedImage = new Image();
            uploadedImage.setUrl(uploadFile(image));
            return uploadedImage;
        }).toList();
    }
}