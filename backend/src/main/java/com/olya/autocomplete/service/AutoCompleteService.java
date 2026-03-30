package com.olya.autocomplete.service;

import jakarta.annotation.PostConstruct;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.search.suggest.FileDictionary;
import org.apache.lucene.search.suggest.Lookup.LookupResult;
import org.apache.lucene.search.suggest.analyzing.AnalyzingSuggester;
import org.apache.lucene.store.ByteBuffersDirectory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class AutoCompleteService {

    private AnalyzingSuggester suggester;

    @PostConstruct
    public void init() throws IOException {
        suggester = new AnalyzingSuggester(
                new ByteBuffersDirectory(),
                "autocomplete",
                new StandardAnalyzer()
        );

        ClassPathResource resource = new ClassPathResource("queries.txt");

        try (Reader reader = new InputStreamReader(
                resource.getInputStream(),
                StandardCharsets.UTF_8
        )) {
            FileDictionary dictionary = new FileDictionary(reader);
            suggester.build(dictionary.getEntryIterator());
        }
    }

    public List<String> autocomplete(String query, int limit) throws IOException {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        List<LookupResult> results = suggester.lookup(query, false, limit);
        List<String> suggestions = new ArrayList<>();

        for (LookupResult result : results) {
            suggestions.add(result.key.toString());
        }

        return suggestions;
    }
}