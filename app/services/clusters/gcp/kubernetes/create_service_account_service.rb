# frozen_string_literal: true

module Clusters
  module Gcp
    module Kubernetes
      class CreateServiceAccountService
        attr_reader :kubeclient, :rbac, :service_account_namespace

        def initialize(kubeclient, namespace, rbac:)
          @kubeclient = kubeclient
          @service_account_namespace = namespace
          @rbac = rbac
        end

        def execute
          kubeclient.create_service_account(service_account_resource)
          kubeclient.create_secret(service_account_token_resource)
          kubeclient.create_cluster_role_binding(cluster_role_binding_resource) if rbac
        end

        private

        def service_account_resource
          Gitlab::Kubernetes::ServiceAccount.new(service_account_name, service_account_namespace).generate
        end

        def service_account_token_resource
          Gitlab::Kubernetes::ServiceAccountToken.new(
            SERVICE_ACCOUNT_TOKEN_NAME, service_account_name, service_account_namespace).generate
        end

        def cluster_role_binding_resource
          subjects = [{ kind: 'ServiceAccount', name: service_account_name, namespace: service_account_namespace }]

          Gitlab::Kubernetes::ClusterRoleBinding.new(
            CLUSTER_ROLE_BINDING_NAME,
            CLUSTER_ROLE_NAME,
            subjects
          ).generate
        end

        def service_account_name
          SERVICE_ACCOUNT_NAME
        end
      end
    end
  end
end
