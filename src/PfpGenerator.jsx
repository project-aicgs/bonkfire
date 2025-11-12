import React, { useState, useRef, useEffect } from 'react';
import './PfpGenerator.css';

function PfpGenerator() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);
  const [draggingSticker, setDraggingSticker] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Generate sticker paths from 33.png to 64.png
  const stickerImages = Array.from({ length: 32 }, (_, i) => `/${i + 33}.png`);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setUploadedImage(img);
          setStickers([]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const addSticker = (stickerSrc) => {
    if (!uploadedImage) return;

    const img = new Image();
    img.onload = () => {
      const newSticker = {
        id: Date.now(),
        src: stickerSrc,
        image: img,
        x: 150,
        y: 150,
        scale: 0.5,
        rotation: 0,
        locked: false
      };
      setStickers([...stickers, newSticker]);
      setActiveSticker(newSticker.id);
    };
    img.src = stickerSrc;
  };

  const handleCanvasMouseDown = (e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on a sticker (in reverse order to get topmost)
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      if (sticker.locked) continue;

      const stickerWidth = sticker.image.width * sticker.scale;
      const stickerHeight = sticker.image.height * sticker.scale;

      if (
        x >= sticker.x &&
        x <= sticker.x + stickerWidth &&
        y >= sticker.y &&
        y <= sticker.y + stickerHeight
      ) {
        setDraggingSticker(sticker.id);
        setActiveSticker(sticker.id);
        setDragOffset({
          x: x - sticker.x,
          y: y - sticker.y
        });
        break;
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (draggingSticker === null || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStickers(stickers.map(s => 
      s.id === draggingSticker
        ? { ...s, x: x - dragOffset.x, y: y - dragOffset.y }
        : s
    ));
  };

  const handleCanvasMouseUp = () => {
    setDraggingSticker(null);
  };

  const lockSticker = () => {
    if (activeSticker === null) return;
    setStickers(stickers.map(s => 
      s.id === activeSticker ? { ...s, locked: true } : s
    ));
    setActiveSticker(null);
  };

  const removeSticker = () => {
    if (activeSticker === null) return;
    setStickers(stickers.filter(s => s.id !== activeSticker));
    setActiveSticker(null);
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;

    try {
      canvasRef.current.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
          alert('✓ Copied to clipboard!');
        });
      });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Draw on canvas
  useEffect(() => {
    if (!canvasRef.current || !uploadedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 500;
    canvas.height = 500;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw uploaded image (fitted to canvas)
    const scale = Math.min(canvas.width / uploadedImage.width, canvas.height / uploadedImage.height);
    const x = (canvas.width - uploadedImage.width * scale) / 2;
    const y = (canvas.height - uploadedImage.height * scale) / 2;
    ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);

    // Draw stickers
    stickers.forEach(sticker => {
      ctx.save();
      ctx.globalAlpha = sticker.locked ? 1 : 0.9;
      
      // Draw sticker
      ctx.drawImage(
        sticker.image,
        sticker.x,
        sticker.y,
        sticker.image.width * sticker.scale,
        sticker.image.height * sticker.scale
      );

      // Draw selection border for active sticker
      if (sticker.id === activeSticker && !sticker.locked) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(
          sticker.x,
          sticker.y,
          sticker.image.width * sticker.scale,
          sticker.image.height * sticker.scale
        );
        ctx.setLineDash([]);
      }

      ctx.restore();
    });
  }, [uploadedImage, stickers, activeSticker]);

  return (
    <div className="pfp-generator-section">
      <div className="pfp-title">
        <h2>PFP GENERATOR</h2>
      </div>

      <div className="pfp-content">
        {!uploadedImage ? (
          <div className="upload-area">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button 
              className="pfp-button upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <p className="upload-hint">Click to upload your profile picture</p>
          </div>
        ) : (
          <div className="pfp-workspace">
            <div className="canvas-area">
              <canvas
                ref={canvasRef}
                className="pfp-canvas"
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
              />
              
              <div className="canvas-controls">
                <button 
                  className="pfp-button control-button apply-button"
                  onClick={lockSticker}
                  disabled={activeSticker === null}
                  title="Apply sticker"
                >
                  ✓
                </button>
                <button 
                  className="pfp-button control-button remove-button"
                  onClick={removeSticker}
                  disabled={activeSticker === null}
                  title="Remove sticker"
                >
                  ✕
                </button>
                <button 
                  className="pfp-button control-button copy-button"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  Copy
                </button>
                <button 
                  className="pfp-button control-button reset-button"
                  onClick={() => {
                    setUploadedImage(null);
                    setStickers([]);
                    setActiveSticker(null);
                  }}
                  title="Upload new image"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="sticker-menu">
              <h3 className="sticker-menu-title">Stickers</h3>
              <div className="sticker-grid">
                {stickerImages.map((src, index) => (
                  <div
                    key={index}
                    className="sticker-item"
                    onClick={() => addSticker(src)}
                  >
                    <img src={src} alt={`Sticker ${index + 33}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PfpGenerator;

