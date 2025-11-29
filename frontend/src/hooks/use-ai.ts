"use client";

import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { useState, useEffect } from "react";

let model: use.UniversalSentenceEncoder | null = null;

export function useAI() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function loadModel() {
            if (!model) {
                await tf.ready();
                model = await use.load();
            }
            setIsReady(true);
        }
        loadModel();
    }, []);

    const extractKeywords = async (text: string) => {
        if (!model || !text) return [];

        // Simple keyword extraction simulation using embeddings
        // In a real app, we would compare embeddings of text against a set of candidate tags
        // For this demo, we'll just return some mock "AI detected" tags based on simple heuristics
        // combined with the fact that the model is loaded (proving TFJS is working)

        const embeddings = await model.embed(text);
        embeddings.dispose(); // Cleanup

        // Mock logic for demo purposes since pure USE doesn't do keyword extraction directly
        const keywords = [];
        const lower = text.toLowerCase();
        if (lower.includes("meeting") || lower.includes("schedule")) keywords.push("meeting");
        if (lower.includes("project") || lower.includes("plan")) keywords.push("project");
        if (lower.includes("idea") || lower.includes("think")) keywords.push("idea");
        if (lower.includes("urgent") || lower.includes("asap")) keywords.push("urgent");

        return keywords;
    };

    return { isReady, extractKeywords };
}
