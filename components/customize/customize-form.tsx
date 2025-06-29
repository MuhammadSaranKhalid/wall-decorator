"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function CustomizeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    material: "",
    size: "",
    style: "",
    description: "",
    budget: "",
    timeline: "",
    additionalStyles: [],
  });

  const [files, setFiles] = useState<File[]>([]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 3,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const validationErrors: any = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.description)
      validationErrors.description = "Description is required";
    if (!formData.material) validationErrors.material = "Material is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Custom order submitted:", formData, files);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        material: "",
        size: "",
        style: "",
        description: "",
        budget: "",
        timeline: "",
        additionalStyles: [],
      });
      setFiles([]);
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error states
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-[#2E2C2A]">
          Custom Design Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-green-500 font-semibold">
            Thank you for your request! We will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Design Description *</Label>
              <Textarea
                id="description"
                placeholder="Please describe your vision, including colors, themes, or specific elements you'd like to include..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <Label>Upload Images</Label>
              <div
                {...getRootProps()}
                className="dropzone border-2 border-dashed rounded-md p-4 text-center"
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>
                  (Only *.jpeg, *.jpg, *.png, *.gif images will be accepted, max
                  3 files)
                </em>
              </div>
              <aside className="mt-4">
                {files.length > 0 && <h4>Files</h4>}
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      {file.name} - {file.size} bytes
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <div>
              <Label>Timeline</Label>
              <Select
                onValueChange={(value) => handleInputChange("timeline", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="When do you need this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="5-days">Within 5 days</SelectItem>
                  <SelectItem value="7-days">Within 7 days</SelectItem>
                  <SelectItem value="9-days">Within 9 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-[#F8F6F3] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2E2C2A] mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-[#777] space-y-1">
                <li>• We'll review your request within 24 hours</li>
                <li>• Our design team will create initial concepts</li>
                <li>• We'll schedule a consultation to discuss details</li>
                <li>• Upon approval, we'll begin crafting your custom piece</li>
                <li>• Upon approval, you will have to pay the half payment</li>
              </ul>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90"
            >
              Submit Custom Request
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
