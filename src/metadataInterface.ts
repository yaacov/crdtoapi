/**
 * Mustache template file for findInterfaces utility
 */

export const metadataInterfaceTemplate = `/**
 * {{openAPITitle}}
 * {{openAPIDescription}}
 *
 * The version of the OpenAPI document: {{openAPIVersion}}
 * Contact Email: {{OpenAPIContactEmail}}
 * License: {{OpenAPILicense}}
 *
 * NOTE: This file is auto generated by crdtotypes (https://github.com/yaacov/crdtoapi/).
 * https://github.com/yaacov/crdtoapi/README.crdtotypes
 */

/**
 * OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.
 * @export
 * @interface IoK8sApimachineryPkgApisMetaV1OwnerReference
 */
export interface IoK8sApimachineryPkgApisMetaV1OwnerReference {
  /**
   * API version of the referent.
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1OwnerReference
   */
  apiVersion: string;
  /**
   * If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
   * @type {boolean}
   * @memberof IoK8sApimachineryPkgApisMetaV1OwnerReference
   */
  blockOwnerDeletion?: boolean;
  /**
   * If true, this reference points to the managing controller.
   * @type {boolean}
   * @memberof IoK8sApimachineryPkgApisMetaV1OwnerReference
   */
  controller?: boolean;
  /**
   * Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1OwnerReference
   */
  kind: string;
  /**
   * Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1OwnerReference
   */
  name: string;
  /**
   * UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1OwnerReference
   */
  uid: string;
}

/**
 * ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
 * @export
 * @interface IoK8sApimachineryPkgApisMetaV1ObjectMeta
 */
export interface IoK8sApimachineryPkgApisMetaV1ObjectMeta {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations
   * @type &#123;{ [key: string]: string; }&#125;
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  annotations?: { [key: string]: string };
  /**
   * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  creationTimestamp?: string;
  /**
   * Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.
   * @type {number}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  deletionGracePeriodSeconds?: number;
  /**
   * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  deletionTimestamp?: string;
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
   * @type {Array<string>}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  finalizers?: Array<string>;
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  generateName?: string;
  /**
   * A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.
   * @type {number}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  generation?: number;
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels
   * @type &#123;{ [key: string]: string; }&#125;
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  labels?: { [key: string]: string };
  /**
   * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  name?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  namespace?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
   * @type {Array<IoK8sApimachineryPkgApisMetaV1OwnerReference>}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  ownerReferences?: Array<IoK8sApimachineryPkgApisMetaV1OwnerReference>;
  /**
   * An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
   *
   * Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  resourceVersion?: string;
  /**
   * Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  selfLink?: string;
  /**
   * UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
   *
   * Populated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   * @type {string}
   * @memberof IoK8sApimachineryPkgApisMetaV1ObjectMeta
   */
  uid?: string;
}
`;
