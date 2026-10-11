import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselService, CarouselPhoto } from '../../../services/carousel.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-carousel-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-carousel-modal.html',
})
export class AdminCarouselModal {
  carouselService = inject(CarouselService);
  authService = inject(AuthService);

  isOpen = this.carouselService.isAdminModalOpen;
  photos = this.carouselService.photos;

  // Estados de subida y archivo
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  customPhotoName = signal<string>('');
  fileSizeText = signal<string>('');
  isDragging = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Estado de eliminación con confirmación
  photoToDelete = signal<CarouselPhoto | null>(null);

  // Vista ampliada (Lightbox)
  lightboxPhoto = signal<CarouselPhoto | null>(null);

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.lightboxPhoto()) {
      this.lightboxPhoto.set(null);
    } else if (this.photoToDelete()) {
      this.photoToDelete.set(null);
    } else if (this.isOpen()) {
      this.close();
    }
  }

  close() {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.customPhotoName.set('');
    this.photoToDelete.set(null);
    this.lightboxPhoto.set(null);
    this.carouselService.closeAdminModal();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  private processFile(file: File) {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Validación estricta para formato JPG (.jpg o .jpeg)
    const isJpgMime = file.type === 'image/jpeg';
    const isJpgExt = /\.(jpe?g)$/i.test(file.name);

    if (!isJpgMime && !isJpgExt) {
      this.errorMessage.set(
        `Formato no admitido. Solo se admiten archivos en formato JPG (.jpg, .jpeg). El archivo seleccionado "${file.name}" no es válido.`,
      );
      this.selectedFile.set(null);
      this.previewUrl.set(null);
      return;
    }

    this.selectedFile.set(file);
    this.customPhotoName.set(file.name.replace(/\.[^/.]+$/, ''));
    this.fileSizeText.set(this.formatFileSize(file.size));

    // Lectura para previsualización inmediata
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl.set(e.target?.result as string);
    };
    reader.onerror = () => {
      this.errorMessage.set('Hubo un error al leer la imagen seleccionada.');
      this.selectedFile.set(null);
      this.previewUrl.set(null);
    };
    reader.readAsDataURL(file);
  }

  saveUploadedPhoto() {
    const preview = this.previewUrl();
    const file = this.selectedFile();
    if (!preview || !file) {
      this.errorMessage.set('Por favor, selecciona primero un archivo JPG.');
      return;
    }

    const name = this.customPhotoName().trim() || file.name;
    const newPhoto: CarouselPhoto = {
      id: 'foto-' + Date.now(),
      url: preview,
      name: name.endsWith('.jpg') || name.endsWith('.jpeg') ? name : `${name}.jpg`,
      isDefault: false,
      addedAt: Date.now(),
      sizeText: this.fileSizeText(),
    };

    this.carouselService.addPhoto(newPhoto);
    this.successMessage.set(`¡Foto "${newPhoto.name}" añadida correctamente al carrusel!`);
    this.errorMessage.set(null);

    // Limpiar selección de subida
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.customPhotoName.set('');
  }

  cancelUpload() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.customPhotoName.set('');
    this.errorMessage.set(null);
  }

  requestDelete(photo: CarouselPhoto) {
    this.photoToDelete.set(photo);
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }

  cancelDelete() {
    this.photoToDelete.set(null);
  }

  confirmDelete() {
    const target = this.photoToDelete();
    if (target) {
      this.carouselService.removePhoto(target.id);
      this.successMessage.set(`La foto "${target.name}" ha sido eliminada del carrusel.`);
      this.photoToDelete.set(null);
    }
  }

  resetDefaults() {
    if (
      confirm(
        '¿Deseas restablecer las 10 fotos originales dedicadas al carrusel de Navarra? Se perderán las fotos añadidas manualmente.',
      )
    ) {
      this.carouselService.resetToDefaults();
      this.successMessage.set('Se han restablecido las 10 fotos predeterminadas del carrusel.');
      this.errorMessage.set(null);
      this.photoToDelete.set(null);
    }
  }

  openLightbox(photo: CarouselPhoto) {
    this.lightboxPhoto.set(photo);
  }

  closeLightbox() {
    this.lightboxPhoto.set(null);
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}
