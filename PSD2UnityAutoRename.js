﻿/*
layer.typename{
    LayerSet : 图层组
    ArtLayer : 图片或文字
}
*/
/*
layer.kind{
    LayerKind.TEXT : 文本
    LayerKind.NORMAL : 图片
}
*/
var imgIndex = 0;

function rename(layers) {
    if (documents.length == 0) {
        alert("没有可处理的文档");
    } else {
        if (layers.length == 1 && docRef.activeLayer.isBackgroundLayer == 1) {
            alert("The Background layer can not be hidden when it is the only layer in a document.");
        } else {
            for (var i = 0; i < layers.length; i++) {
                var layerSetOrArtLayer = layers[i];
                var name = layerSetOrArtLayer.name;
                if (layerSetOrArtLayer.typename == "ArtLayer") {
                    if (layerSetOrArtLayer.kind == "LayerKind.TEXT") {
                        if (name.substr(name.length - 5, 5) != "=Text" || name.length < 5) {
                            layerSetOrArtLayer.name = name + "-ID-" + imgIndex + "=Text";
                        }
                    } else if (layerSetOrArtLayer.kind == "LayerKind.NORMAL") {
                        if (name.substr(name.length - 4, 4) != "=PNG" || name.length < 4) {
                            layerSetOrArtLayer.name = name + "-ID-" + imgIndex + "=PNG";
                        }
                    }
                    imgIndex = imgIndex + 1;
                } else if (layerSetOrArtLayer.typename == "LayerSet") {
                    layerSetOrArtLayer.name = name + "-ID-" + imgIndex;
                    imgIndex = imgIndex + 1;
                    rename(layerSetOrArtLayer.layers);
                }

            }
        }
    }
}
var visibility = false;
var docRef = activeDocument;
var layers = docRef.layers;
rename(layers)