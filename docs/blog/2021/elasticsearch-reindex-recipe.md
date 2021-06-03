---
title: Recipe for Reindexing data in ElasticSearch
date: 2021-05-26
slug: elasticsearch-reindex-recipe
description: A simple recipe to reindex data into ElasticSearch that covers all situations, ensures consistency and zero downtime.
tags:
- elasticsearch
---

## The need for Reindexing

Reindexing happens when we need to change how data is indexed and stored in ElasticSearch. Below are a few examples:

#### 1. Reindexing within the same cluster e.g. when index mapping or search requirements change
- Changing the index mapping in a non-backward compatible way e.g. changing how a field is *analyzed* (or its analyzer(s)) during indexing, changing a field's type. This is similar to changing schema in a database.
- Adding new searchable fields to existing documents. This requires adding mapping for these fields, as well as index new data into existing documents.
- Content of some fields are changed. Maybe we changed the pre-processing logic for these fields.
- etc.

#### 2. Reindexing into another cluster e.g. when migrating from one cluster to another
- Migrating from on-premise to cloud.
- Upgrading ElasticSearch cluster version. Although we can do [rolling upgrade](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html), it will be hard if we need to upgrade from a very old version.

It is a common operation in working with ElasticSearch. As such, having an automated and reliable process for reindexing is a must.

## The need for this recipe

Reindexing is actually the easy part of the problem. After all, we only need to create the new mapping and start "indexing" data into it. The hard parts are:

#### 1. Ensuring data consistency

#### 2. Roll out the new mapping without downtime

[Elastic](https://www.elastic.co/) (the creator of ElasticSearch) even provides a[Reindex API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html)
that copies documents from a source to a destination. They also provide a [guide](https://www.elastic.co/blog/changing-mapping-with-zero-downtime) to changing mapping and
reindexing data without downtime that works with every version of ElasticSearch by the use of [index aliases](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-aliases.html).

### Features

## The ingredients

#### 1. Data source
#### 2. Decoupling

## Prior Art