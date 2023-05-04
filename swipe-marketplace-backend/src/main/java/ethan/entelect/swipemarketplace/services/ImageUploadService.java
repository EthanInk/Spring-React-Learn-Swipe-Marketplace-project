package ethan.entelect.swipemarketplace.services;

import ethan.entelect.swipemarketplace.entities.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageUploadService {
    public List<Image> uploadImagesGetURL(List<MultipartFile> rawImages);
}

