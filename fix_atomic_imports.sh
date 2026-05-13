#!/bin/bash
# Замена импортов компонентов на новые атомарные пути

# Button
find src -name "*.js" -exec sed -i "s|from '@shared/components/Button.js'|from '@shared/components/Button/Button.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Button.js'|from '../../shared/components/Button/Button.js'|g" {} \;

# Input
find src -name "*.js" -exec sed -i "s|from '@shared/components/Input.js'|from '@shared/components/Input/Input.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Input.js'|from '../../shared/components/Input/Input.js'|g" {} \;

# Textarea
find src -name "*.js" -exec sed -i "s|from '@shared/components/Textarea.js'|from '@shared/components/Textarea/Textarea.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Textarea.js'|from '../../shared/components/Textarea/Textarea.js'|g" {} \;

# Checkbox
find src -name "*.js" -exec sed -i "s|from '@shared/components/Checkbox.js'|from '@shared/components/Checkbox/Checkbox.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Checkbox.js'|from '../../shared/components/Checkbox/Checkbox.js'|g" {} \;

# Radio
find src -name "*.js" -exec sed -i "s|from '@shared/components/Radio.js'|from '@shared/components/Radio/Radio.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Radio.js'|from '../../shared/components/Radio/Radio.js'|g" {} \;

# Toggle
find src -name "*.js" -exec sed -i "s|from '@shared/components/Toggle.js'|from '@shared/components/Toggle/Toggle.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Toggle.js'|from '../../shared/components/Toggle/Toggle.js'|g" {} \;

# Select
find src -name "*.js" -exec sed -i "s|from '@shared/components/Select.js'|from '@shared/components/Select/Select.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Select.js'|from '../../shared/components/Select/Select.js'|g" {} \;

# MultiSelect
find src -name "*.js" -exec sed -i "s|from '@shared/components/MultiSelect.js'|from '@shared/components/MultiSelect/MultiSelect.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/MultiSelect.js'|from '../../shared/components/MultiSelect/MultiSelect.js'|g" {} \;

# Image
find src -name "*.js" -exec sed -i "s|from '@shared/components/Image.js'|from '@shared/components/Image/Image.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/Image.js'|from '../../shared/components/Image/Image.js'|g" {} \;

# ToastController
find src -name "*.js" -exec sed -i "s|from '@shared/components/ToastController.js'|from '@shared/components/ToastController/ToastController.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/ToastController.js'|from '../../shared/components/ToastController/ToastController.js'|g" {} \;

# ConfirmDialog
find src -name "*.js" -exec sed -i "s|from '@shared/components/ConfirmDialog.js'|from '@shared/components/ConfirmDialog/ConfirmDialog.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/ConfirmDialog.js'|from '../../shared/components/ConfirmDialog/ConfirmDialog.js'|g" {} \;

# FsStatusIndicator
find src -name "*.js" -exec sed -i "s|from '@shared/components/FsStatusIndicator.js'|from '@shared/components/FsStatusIndicator/FsStatusIndicator.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/FsStatusIndicator.js'|from '../../shared/components/FsStatusIndicator/FsStatusIndicator.js'|g" {} \;

# GlowTitle
find src -name "*.js" -exec sed -i "s|from '@shared/components/GlowTitle.js'|from '@shared/components/GlowTitle/GlowTitle.js'|g" {} \;
find src -name "*.js" -exec sed -i "s|from '../../shared/components/GlowTitle.js'|from '../../shared/components/GlowTitle/GlowTitle.js'|g" {} \;

echo "✅ Замена импортов завершена"
