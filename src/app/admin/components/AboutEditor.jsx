"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/app/admin/components/AdminConfirmDialog";
import {
  updateAboutContent,
  uploadAboutImage,
  resetAboutContent,
} from "@/app/admin/actions/about";

function ImageUpload({ label, slot, siteId, imageUrl, onUploaded }) {
  const [isUploading, startUpload] = useTransition();

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("siteId", siteId);
    fd.append("slot", slot);

    startUpload(async () => {
      try {
        const url = await uploadAboutImage(fd);
        onUploaded(url);
        toast.success("Image uploaded");
      } catch (err) {
        toast.error(err.message ?? "Upload failed");
      }
    });

    e.target.value = "";
  }

  return (
    <div className="admin-about-image">
      <div className={`admin-about-image-preview${imageUrl ? " has-image" : ""}`}>
        {imageUrl ? (
          <img src={imageUrl} alt="" />
        ) : (
          <span className="admin-about-image-placeholder">No image — placeholder shown on site</span>
        )}
      </div>
      <label className="admin-upload-zone">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleUpload}
          disabled={isUploading}
        />
        <span>{isUploading ? "Uploading…" : label}</span>
      </label>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="admin-card admin-card-padded admin-about-section">
      <h3 className="admin-about-section-title">{title}</h3>
      {children}
    </div>
  );
}

export default function AboutEditor({ siteSlug, siteId, initialContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isSaving, startSave] = useTransition();
  const [isResetting, startReset] = useTransition();
  const confirm = useConfirm();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  function update(path, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function updateStep(index, field, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.process.steps[index][field] = value;
      return next;
    });
  }

  function updateValue(index, field, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.values.items[index][field] = value;
      return next;
    });
  }

  function updatePlace(index, field, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.places.items[index][field] = value;
      return next;
    });
  }

  function handleSave() {
    startSave(async () => {
      try {
        await updateAboutContent(siteSlug, JSON.stringify(content));
        router.refresh();
        toast.success("About page saved");
      } catch (err) {
        toast.error(err.message ?? "Save failed");
      }
    });
  }

  async function handleReset() {
    const ok = await confirm({
      title: "Reset to defaults?",
      description: "All About page content will be replaced with the default copy and images.",
      confirmLabel: "Reset",
      destructive: true,
    });
    if (!ok) return;

    startReset(async () => {
      try {
        await resetAboutContent(siteSlug);
        router.refresh();
        toast.success("About page reset to defaults");
      } catch (err) {
        toast.error(err.message ?? "Reset failed");
      }
    });
  }

  return (
    <div className="admin-about-editor">
      <div className="admin-page-header" style={{ marginBottom: "1rem" }}>
        <div>
          <p className="admin-section-desc" style={{ margin: 0 }}>
            Edit all text and photos on the Our Craft page. Empty images show placeholders on the storefront.
          </p>
        </div>
        <div className="admin-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={handleReset}
            disabled={isResetting}
          >
            {isResetting ? "Resetting…" : "Reset to defaults"}
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <SectionCard title="Hero">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.hero.headline}
              onChange={(e) => update("hero.headline", e.target.value)}
            />
          </label>
          <label>
            Subtext
            <textarea
              rows={3}
              value={content.hero.subtext}
              onChange={(e) => update("hero.subtext", e.target.value)}
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Origin">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.origin.headline}
              onChange={(e) => update("origin.headline", e.target.value)}
            />
          </label>
          <label>
            Body
            <textarea
              rows={4}
              value={content.origin.body}
              onChange={(e) => update("origin.body", e.target.value)}
            />
          </label>
          <label>
            Extra paragraph
            <textarea
              rows={3}
              value={content.origin.bodyExtra}
              onChange={(e) => update("origin.bodyExtra", e.target.value)}
            />
          </label>
          <label>
            Image alt / placeholder label
            <input
              type="text"
              value={content.origin.imageLabel}
              onChange={(e) => update("origin.imageLabel", e.target.value)}
            />
          </label>
          <ImageUpload
            label="Upload origin photo"
            slot="origin"
            siteId={siteId}
            imageUrl={content.origin.imageUrl}
            onUploaded={(url) => update("origin.imageUrl", url)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Process">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.process.headline}
              onChange={(e) => update("process.headline", e.target.value)}
            />
          </label>
          <label>
            Subtext
            <input
              type="text"
              value={content.process.subtext}
              onChange={(e) => update("process.subtext", e.target.value)}
            />
          </label>
          {content.process.steps.map((step, i) => (
            <fieldset key={step.num ?? i} className="admin-about-fieldset">
              <legend>Step {step.num}</legend>
              <label>
                Title
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(i, "title", e.target.value)}
                />
              </label>
              <label>
                Body
                <textarea
                  rows={2}
                  value={step.body}
                  onChange={(e) => updateStep(i, "body", e.target.value)}
                />
              </label>
            </fieldset>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Values">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.values.headline}
              onChange={(e) => update("values.headline", e.target.value)}
            />
          </label>
          {content.values.items.map((item, i) => (
            <fieldset key={item.badge ?? i} className="admin-about-fieldset">
              <legend>Value {i + 1}</legend>
              <label>
                Badge label (for seal icon)
                <input
                  type="text"
                  value={item.badge}
                  onChange={(e) => updateValue(i, "badge", e.target.value)}
                />
              </label>
              <label>
                Title
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateValue(i, "title", e.target.value)}
                />
              </label>
              <label>
                Body
                <textarea
                  rows={2}
                  value={item.body}
                  onChange={(e) => updateValue(i, "body", e.target.value)}
                />
              </label>
            </fieldset>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Places">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.places.headline}
              onChange={(e) => update("places.headline", e.target.value)}
            />
          </label>
          <label>
            Subtext
            <input
              type="text"
              value={content.places.subtext}
              onChange={(e) => update("places.subtext", e.target.value)}
            />
          </label>
          {content.places.items.map((place, i) => (
            <fieldset key={place.region ?? i} className="admin-about-fieldset">
              <legend>{place.region}</legend>
              <label>
                Region name
                <input
                  type="text"
                  value={place.region}
                  onChange={(e) => updatePlace(i, "region", e.target.value)}
                />
              </label>
              <label>
                Body
                <textarea
                  rows={3}
                  value={place.body}
                  onChange={(e) => updatePlace(i, "body", e.target.value)}
                />
              </label>
              <label>
                Image alt / placeholder label
                <input
                  type="text"
                  value={place.imageLabel}
                  onChange={(e) => updatePlace(i, "imageLabel", e.target.value)}
                />
              </label>
              <ImageUpload
                label={`Upload ${place.region} photo`}
                slot={`place-${i}`}
                siteId={siteId}
                imageUrl={place.imageUrl}
                onUploaded={(url) => updatePlace(i, "imageUrl", url)}
              />
            </fieldset>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Banter line">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.banter.headline}
              onChange={(e) => update("banter.headline", e.target.value)}
            />
          </label>
          <label>
Line
            <input
              type="text"
              value={content.banter.line}
              onChange={(e) => update("banter.line", e.target.value)}
            />
          </label>
          <label>
            Mood
            <input
              type="text"
              value={content.banter.mood}
              onChange={(e) => update("banter.mood", e.target.value)}
              placeholder="e.g. sunny, confident, warm"
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Closing CTA">
        <div className="admin-form">
          <label>
            Headline
            <input
              type="text"
              value={content.cta.headline}
              onChange={(e) => update("cta.headline", e.target.value)}
            />
          </label>
          <label>
            Body
            <textarea
              rows={2}
              value={content.cta.body}
              onChange={(e) => update("cta.body", e.target.value)}
            />
          </label>
          <div className="admin-form-row">
            <label>
              Primary button label
              <input
                type="text"
                value={content.cta.primaryLabel}
                onChange={(e) => update("cta.primaryLabel", e.target.value)}
              />
            </label>
            <label>
              Primary link
              <input
                type="text"
                value={content.cta.primaryHref}
                onChange={(e) => update("cta.primaryHref", e.target.value)}
              />
            </label>
          </div>
          <div className="admin-form-row">
            <label>
              Secondary button label
              <input
                type="text"
                value={content.cta.secondaryLabel}
                onChange={(e) => update("cta.secondaryLabel", e.target.value)}
              />
            </label>
            <label>
              Secondary link
              <input
                type="text"
                value={content.cta.secondaryHref}
                onChange={(e) => update("cta.secondaryHref", e.target.value)}
              />
            </label>
          </div>
        </div>
      </SectionCard>

      <div className="admin-actions" style={{ marginTop: "1rem" }}>
        <a
          href="/our-craft"
          className="admin-btn admin-btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Preview page ↗
        </a>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
